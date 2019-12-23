import React, { Component, SyntheticEvent } from 'react';
import View from './WatchPhotos.view';
import AlbumService from '../Albums/albums.service';
import BaseModel from '../../utils/baseModel';

export default class WatchPhotos extends Component {
	albumService = new AlbumService();

	state = {
		albums: [],
		covers: [],
	};

	componentDidMount = (): void => {
		this.saveDownloadAlbumsToState();
	};

	private saveDownloadAlbumsToState = async (): Promise<void> => {
		const albums = await this.albumService.fetchAllAlbums();
		this.setState({ albums: albums });
	};

	setSelectedAlbum = (e: SyntheticEvent<HTMLButtonElement>) => BaseModel.setSelectedAlbum(e);

	render() {
		return <View setSelectedAlbum={this.setSelectedAlbum} albums={this.state.albums} />;
	}
}
