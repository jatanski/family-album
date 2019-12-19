import React, { Component, FormEvent } from 'react';
import View from './View';
import './albums.scss';
import { AlbumProps, AlbumsState } from './types';
import BaseModel from '../../utils/baseModel';

class Albums extends Component<{}, AlbumsState> {
  info: AlbumProps = {
    name: 'Nowy album',
    description: 'Bardzo fajny album z naszej młodości.',
    beginningDate: '01-02-2000',
    endDate: '22-12-2012',
  };

  state = {
    showModalAddAlbum: false,
    name: '',
    description: '',
    beginningDate: '',
    endDate: '',
    albums: [this.info, this.info],
  };

  readonly endpoint: string = 'album';

  componentDidMount = (): void => {
    this.downloadAllAlbums();
  };

  downloadAllAlbums = async (): Promise<void> => {
    const token = BaseModel.getAuthToken();

    if (token) {
      try {
        const response = await fetch(BaseModel.baseApiUrl + this.endpoint, {
          method: 'GET',
          headers: { 'x-token': token },
        });

        const responseData = await response.json();

        console.log(responseData);
      } catch (error) {
        console.error(error);
      }
    }
  };

  toggleShowModal = (): void =>
    this.setState({
      showModalAddAlbum: !this.state.showModalAddAlbum,
      name: '',
      description: '',
      beginningDate: '',
      endDate: '',
    });

  handleInputChange = (e: FormEvent<HTMLInputElement>): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const state: any = {};
    state[`${e.currentTarget.id}`] = e.currentTarget.value;
    this.setState(state);
  };

  addAlbum = (): void => {
    const albumIsCreated = this.submitAlbum();

    if (albumIsCreated) {
      const { showModalAddAlbum, albums, ...albumToAddData } = this.state;
      this.setState({ albums: [...this.state.albums, albumToAddData], showModalAddAlbum: false });
    }
  };

  submitAlbum = async (): Promise<boolean> => {
    const token = BaseModel.getAuthToken();

    const { showModalAddAlbum, albums, beginningDate, endDate, ...stateToSend } = this.state;

    const albumData = {
      ...stateToSend,
      beginningDate: new Date(beginningDate).getTime(),
      endDate: new Date(endDate).getTime(),
    };

    if (token) {
      try {
        const response = await fetch(BaseModel.baseApiUrl + this.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-token': token,
          },
          body: JSON.stringify(albumData),
        });

        const responseData = await response.json();

        console.log(responseData);
        return true;
      } catch (error) {
        console.error(error);
      }
    }
    return false;
  };

  render() {
    return (
      <View
        handleInputChange={this.handleInputChange}
        showModalAddAlbum={this.state.showModalAddAlbum}
        toggleShowModal={this.toggleShowModal}
        albumsArr={this.state.albums}
        addAlbum={this.addAlbum}
      />
    );
  }
}

export default Albums;
