import React, { Component, createRef, SyntheticEvent, RefObject, FormEvent, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/reducers';
import View from './AddPhoto.view';
import BaseModel from '../../utils/baseModel';
import { AddPhotoState, HandleDescInputState, HandleDateInputState } from './AddPhoto.types';
import AlbumService from '../Albums/albums.service';
import { resetUploadImagesRequest, startUploadImageRequest, endUploadImageRequest } from '../../redux/request/actions';
import { bindActionCreators, AnyAction, Dispatch } from 'redux';
import { withToastManager, ToastConsumerContext } from 'react-toast-notifications';

type Props = { toastManager: ToastConsumerContext } & ReturnType<typeof mapStateToProps> &
	ReturnType<typeof mapDispatchToProps>;
class AddPhoto extends Component<Props, AddPhotoState> {
	readonly albumService = new AlbumService();
	private endpoint: string = 'image';
	public fileInput: RefObject<HTMLInputElement> = createRef();

	state = {
		images: [],
		desc: [],
		createdDates: [],
		albums: [],
		selectedAlbum: '',
		sendedImages: 0,
	};

	componentDidMount(): void {
		this.saveDownloadAlbumsToState();
		this.setSelectedAlbum();
	}

	private async saveDownloadAlbumsToState(): Promise<void> {
		const albums = await this.albumService.downloadAllAlbums();
		this.setState({ albums: albums });
	}

	private setSelectedAlbum(): void {
		const selectedAlbum = this.props.album;

		this.setState({ selectedAlbum: selectedAlbum });
	}

	componentDidUpdate(_prevProps: Props, prevState: AddPhotoState): void {
		if (prevState.sendedImages !== this.state.sendedImages) this.clearImagesInStateAfterSendToServer();
	}

	private clearImagesInStateAfterSendToServer(): void {
		if (this.state.sendedImages === this.state.images.length && this.state.images.length !== 0) {
			this.props.toastManager.add('Udało się załadować wszystkie zdjęcia.', {
				appearance: 'success',
				autoDismiss: true,
			});
			this.setState({ images: [], desc: [] });
		}
	}

	handleSelectAlbumInput = (e: ChangeEvent<HTMLSelectElement>): void =>
		this.setState({ selectedAlbum: e.target.value != 'Wybierz album' ? e.target.value : '' });

	handleFileInput = (): void => {
		// @ts-ignore
		const photos = Array.from(this.fileInput.current?.files);
		const emptyDescriptionsAndDate = photos.map(() => '');

		this.setState({
			images: [...this.state.images, ...photos],
			desc: [...emptyDescriptionsAndDate],
			createdDates: [...emptyDescriptionsAndDate],
		});
	};

	handleDescInput = (e: FormEvent<HTMLInputElement>): void => {
		const imageIndex: number = Number(e.currentTarget.name);

		const state: HandleDescInputState = { desc: this.state.desc };
		state.desc[imageIndex] = e.currentTarget.value;

		this.setState(state);
	};

	handleDateInput = (e: FormEvent<HTMLInputElement>): void => {
		const imageIndex: number = Number(e.currentTarget.name);

		const state: HandleDateInputState = { createdDates: this.state.createdDates };
		state.createdDates[imageIndex] = e.currentTarget.value;
		this.setState(state);
	};

	deletePhoto = (e: SyntheticEvent<HTMLButtonElement>) => {
		const imageIndex: number = Number(e.currentTarget.name);
		console.log(this.state);

		const images = this.state.images;
		const desc = this.state.desc;

		images.splice(imageIndex, 1);
		desc.splice(imageIndex, 1);

		this.setState({ images: images, desc: desc });
	};

	submitPhotos = async (e: SyntheticEvent<HTMLButtonElement>): Promise<void> => {
		e.preventDefault();
		console.log(this.state.selectedAlbum);
		if (this.state.selectedAlbum == '') {
			this.props.toastManager.add('Wybierz album do którego chcesz dodać zdjęcia.', {
				appearance: 'error',
				autoDismiss: true,
			});
		} else if (this.state.images.length == 0) {
			this.props.toastManager.add('Wybierz zdjęcia, które chcesz wgrać.', {
				appearance: 'error',
				autoDismiss: true,
			});
		} else {
			this.props.resetUploadImagesRequest();
			this.state.images.forEach(async (image, i) => {
				this.props.startUploadImageRequest(i);
				await this.sendImageToServer(image, i);
				this.props.endUploadImageRequest(i);
			});
		}
	};

	private sendImageToServer = async (photo: File, photoIndex: number): Promise<void> => {
		const photoData = this.createPhotoData(photo, photoIndex);
		const token = BaseModel.getAuthToken();

		if (token) {
			try {
				const response = await fetch(BaseModel.baseApiUrl + this.endpoint, {
					method: 'POST',
					headers: { 'x-token': token },
					body: photoData,
				});

				if (response.ok) {
					this.setState({ sendedImages: this.state.sendedImages + 1 });
					console.log(`Zdjęcie numer ${photoIndex} zostało wysłane.`);
				} else {
					let message: string;
					switch (response.status) {
						case 400:
							message = 'Jakieś dane zostały podane nieprawidłowo.';
							break;
						case 500:
						default:
							message = 'Niespodziewany błąd serwera.';
					}
					message += 'Jeśli często go widzisz skontaktuj się z twórcami';
					this.props.toastManager.add(message, {
						appearance: 'error',
						autoDismiss: true,
					});
				}
			} catch (error) {
				this.props.toastManager.add('Nie udało połączyć się z serwerem. Sprawdź połączenie sieciowe.', {
					appearance: 'error',
					autoDismiss: true,
				});
				console.error(error);
			}
		}
	};

	private createPhotoData(photo: File, photoIndex: number): FormData {
		const photoData = new FormData();

		console.log(this.state.createdDates[photoIndex]);

		photoData.append('file', photo);
		photoData.append('description', this.state.desc[photoIndex]);
		photoData.append('creationDate', Date.parse(this.state.createdDates[photoIndex]) + '');
		photoData.append('albumId', this.state.selectedAlbum);
		return photoData;
	}

	render() {
		return (
			<View
				ref={this.fileInput}
				albums={this.state.albums}
				photos={this.state.images}
				selectedAlbum={this.state.selectedAlbum}
				submitForm={this.submitPhotos}
				handleFileInput={this.handleFileInput}
				handleDescInput={this.handleDescInput}
				handleDateInput={this.handleDateInput}
				handleSelectAlbumInput={this.handleSelectAlbumInput}
				deletePhoto={this.deletePhoto}
			></View>
		);
	}
}

const mapStateToProps = (state: AppState) => ({
	album: state.album.selectedAlbum,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
	return bindActionCreators(
		{
			resetUploadImagesRequest,
			startUploadImageRequest,
			endUploadImageRequest,
		},
		dispatch,
	);
};

export default withToastManager(connect(mapStateToProps, mapDispatchToProps)(AddPhoto));
