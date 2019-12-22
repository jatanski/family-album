import React, { Component, createRef, SyntheticEvent, RefObject, FormEvent, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/reducers';
import View from './AddPhoto.view';
import BaseModel from '../../utils/baseModel';
import { AddPhotoState, handleDescInputState, handleDateInputState } from './AddPhoto.types';
import AlbumService from '../Albums/albums.service';

class AddPhoto extends Component<any, AddPhotoState> {
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

	componentDidUpdate(prevState: AddPhotoState): void {
		if (prevState.sendedImages !== this.state.sendedImages) this.clearImagesInStateAfterSendToServer();
	}

	private clearImagesInStateAfterSendToServer(): void {
		if (this.state.sendedImages === this.state.images.length && this.state.images.length !== 0) {
			this.setState({ images: [], desc: [] });
		}
	}
	handleSelectAlbumInput = (e: ChangeEvent<HTMLSelectElement>): void =>
		this.setState({ selectedAlbum: e.target.value });

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

		const state: handleDescInputState = { desc: this.state.desc };
		state.desc[imageIndex] = e.currentTarget.value;

		this.setState(state);
	};

	handleDateInput = (e: FormEvent<HTMLInputElement>): void => {
		const imageIndex: number = Number(e.currentTarget.name);

		const state: handleDateInputState = { createdDates: this.state.createdDates };
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

		this.state.images.forEach(async (image, i) => {
			await this.sendImageToServer(image, i);
		});
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

				if (response.status === 200) {
					this.setState({ sendedImages: this.state.sendedImages + 1 });
					console.log(`Zdjęcie numer ${photoIndex} zostało wysłane.`);
				}
			} catch (error) {
				console.error(error);
			}
		}
	};

	private createPhotoData(photo: File, photoIndex: number): FormData {
		const photoData = new FormData();

		photoData.append('file', photo);
		photoData.append('description', this.state.desc[photoIndex]);
		photoData.append('createdDate', this.state.createdDates[photoIndex]);
		photoData.append('albumId', this.state.selectedAlbum);

		console.log(photoData);

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

export default connect(mapStateToProps, {})(AddPhoto);
