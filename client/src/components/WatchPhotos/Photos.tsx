import React, { Component } from 'react';
import View from './View';
import AlbumService from '../Albums/albums.service';

export default class Photos extends Component {
  albumService = new AlbumService();

  state = {
    albums: [],
    covers: [],
  };

  componentDidMount = (): void => {
    this.saveDownloadAlbumsToState();
  };

  private saveDownloadAlbumsToState = async (): Promise<void> => {
    const albums = await this.albumService.downloadAllAlbums();
    this.setState({ albums: albums });
  };

  render() {
    return <View albums={this.state.albums}></View>;
  }
}
