import React, { Component, FormEvent, SyntheticEvent } from 'react';
import { AlbumsState } from './Album.types';
import AlbumService from './albums.service';
import BaseModel from '../../utils/baseModel';
import View from './Albums.view';

class Albums extends Component<{}, AlbumsState> {
	startState = {
		showModalAddAlbum: false,
		name: '',
		description: '',
		beginningDate: '',
		endDate: '',
		albums: [],
	};

	state = this.startState;

	albumService = new AlbumService();

	componentDidMount(): void {
		this.saveDownloadAlbumsToState();
	}

	private async saveDownloadAlbumsToState(): Promise<void> {
		const albums = await this.albumService.downloadAllAlbums();
		this.setState({ albums: albums });
	}

	public toggleShowModal = (): void => {
		const { showModalAddAlbum, albums, ...restStartState } = this.startState;

		// reset several state property
		this.setState({
			showModalAddAlbum: !this.state.showModalAddAlbum,
			albums: this.state.albums,
			...restStartState,
		});
	};

	public handleInputChange = (e: FormEvent<HTMLInputElement>): void => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const state: any = {};
		state[`${e.currentTarget.id}`] = e.currentTarget.value;
		this.setState(state);
	};

	public addAlbum = (): void => {
		const albumIsCreated = this.albumService.submitAlbum(this.state);

		if (albumIsCreated) {
			const { showModalAddAlbum, albums, ...albumToAddData } = this.state;
			this.setState({ albums: [...this.state.albums, albumToAddData], showModalAddAlbum: false });
		}
	};

	public setSelectedAlbum = (e: SyntheticEvent<HTMLButtonElement>) => BaseModel.setSelectedAlbum(e);

	render() {
		return (
			<View
				handleInputChange={this.handleInputChange}
				showModalAddAlbum={this.state.showModalAddAlbum}
				toggleShowModal={this.toggleShowModal}
				albumsArr={this.state.albums}
				addAlbum={this.addAlbum}
				setAlbum={this.setSelectedAlbum}
			/>
		);
	}
}

export default Albums;
