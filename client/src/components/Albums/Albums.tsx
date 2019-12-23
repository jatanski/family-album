import React, { Component, FormEvent, SyntheticEvent } from 'react';
import { AlbumsState, AlbumType } from './Album.types';
import AlbumService from './albums.service';
import BaseModel from '../../utils/baseModel';
import View from './Albums.view';
import jwt from 'jsonwebtoken';

class Albums extends Component<{}, AlbumsState> {
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

	albumService = new AlbumService();

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
		const myId = this.giveUserIdFromToken()!;

		const myAlbums = albums.filter(album => album.authorsId?.some(author => author === myId));
		const otherAlbums = albums.filter(album => album.authorsId?.some(author => author !== myId));

		return {
			myAlbums,
			othersAlbums: otherAlbums,
		};
	}

	private giveUserIdFromToken(): string | undefined {
		const token = BaseModel.getAuthToken();
		const tokenAfterDecode = jwt.decode(token!);

		if (typeof tokenAfterDecode === 'string') {
			return undefined;
		} else {
			return tokenAfterDecode!.id;
		}
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

	addAlbum = (): void => {
		const albumIsCreated = this.albumService.submitAlbum(this.state);

		if (albumIsCreated) {
			const { showModalAddAlbum, myAlbums: albums, ...albumToAddData } = this.state;
			this.setState({ myAlbums: [...this.state.myAlbums, albumToAddData], showModalAddAlbum: false });
		}
	};

	setSelectedAlbum = (e: SyntheticEvent<HTMLButtonElement>) => BaseModel.setSelectedAlbum(e);

	render() {
		return (
			<View
				handleInputChange={this.handleInputChange}
				showModalAddAlbum={this.state.showModalAddAlbum}
				toggleShowModal={this.toggleShowModal}
				albumsArr={this.state.myAlbums}
				addAlbum={this.addAlbum}
				setAlbum={this.setSelectedAlbum}
			/>
		);
	}
}

export default Albums;
