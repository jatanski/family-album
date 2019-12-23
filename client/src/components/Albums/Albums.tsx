import React, { Component, FormEvent, SyntheticEvent } from 'react';
import { AlbumsState, AlbumType } from './Album.types';
import AlbumService from './albums.service';
import BaseModel from '../../utils/baseModel';
import View from './Albums.view';
import { withToastManager, ToastConsumerContext } from 'react-toast-notifications';

class Albums extends Component<
	{
		toastManager: ToastConsumerContext;
	},
	AlbumsState
> {
	startState = {
		showModalAddAlbum: false,
		name: '',
		description: '',
		beginningDate: '',
		endDate: '',
		myAlbums: [],
		otherAlbums: [],
	};

	state = this.startState;

	albumService = new AlbumService(this.props.toastManager);

	componentDidMount(): void {
		this.saveFetchedAlbumsToState();
	}

	private async saveFetchedAlbumsToState(): Promise<void> {
		const albums = await this.albumService.fetchAllAlbums();

		const albumsAlfterDivided = this.divideAlbumsIntoMineAndOthers(albums);
		this.setState({ myAlbums: albumsAlfterDivided.myAlbums, otherAlbums: albumsAlfterDivided.othersAlbums });
	}

	private divideAlbumsIntoMineAndOthers(
		albums: Array<AlbumType>,
	): { myAlbums: Array<AlbumType>; othersAlbums: Array<AlbumType> } {
		const myId = BaseModel.giveUserIdFromToken()!;

		const myAlbums = albums.filter(album => album.authorsId?.some(author => author === myId));
		const otherAlbums = albums.filter(album => album.authorsId?.every(author => author !== myId));

		return {
			myAlbums,
			othersAlbums: otherAlbums,
		};
	}

	toggleShowModal = (): void => {
		const { showModalAddAlbum, myAlbums: albums, ...restStartState } = this.startState;

		// reset several state property
		this.setState({
			showModalAddAlbum: !this.state.showModalAddAlbum,
			myAlbums: this.state.myAlbums,
			...restStartState,
		});
	};

	handleInputChange = (e: FormEvent<HTMLInputElement>): void => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const state: any = {};
		state[`${e.currentTarget.id}`] = e.currentTarget.value;
		this.setState(state);
	};

	addAlbum = async (): Promise<void> => {
		const albumIsCreated = await this.albumService.submitAlbum(this.state);

		if (albumIsCreated) {
			const { showModalAddAlbum, myAlbums: albums, ...albumToAddData } = this.state;
			this.setState({ myAlbums: [...this.state.myAlbums, albumToAddData], showModalAddAlbum: false });
		}
	};

	setSelectedAlbum = (e: SyntheticEvent<HTMLButtonElement>) => BaseModel.setSelectedAlbum(e);

	addUserToOtherAlbum = async (e: SyntheticEvent<HTMLButtonElement>) => {
		const userId = BaseModel.giveUserIdFromToken()!;
		const albumId = e.currentTarget.id;
		const otherAlbums = [...this.state.otherAlbums];

		const albumsToAddUser: Array<AlbumType> = otherAlbums.filter(
			(otherAlbum: AlbumType) => otherAlbum._id === albumId,
		);

		albumsToAddUser[0].authorsId?.push(userId);

		const albumsAfterAddUser = albumsToAddUser[0].authorsId!;
		const userAdded = await this.albumService.sendAlbumsWithNewAuthors(albumsAfterAddUser, albumId);

		// if server received ok status refresh myAlbums and otherAlbums in state
		if (userAdded) {
			const newMyAlbums = [...this.state.myAlbums, albumsToAddUser[0]];
			const newOtherAlbums = otherAlbums.filter((otherAlbum: AlbumType) => otherAlbum._id !== albumId);
			this.setState({ myAlbums: newMyAlbums, otherAlbums: newOtherAlbums });
		}
	};

	render() {
		return (
			<View
				handleInputChange={this.handleInputChange}
				showModalAddAlbum={this.state.showModalAddAlbum}
				toggleShowModal={this.toggleShowModal}
				myAlbums={this.state.myAlbums}
				otherAlbums={this.state.otherAlbums}
				addAlbum={this.addAlbum}
				setAlbum={this.setSelectedAlbum}
				addUserToOtherAlbum={this.addUserToOtherAlbum}
			/>
		);
	}
}

export default withToastManager(Albums);
