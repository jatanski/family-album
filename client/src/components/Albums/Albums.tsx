import React, { Component, FormEvent } from 'react';
import View from './View';
import './albums.scss';
import { AlbumProps } from './types';

class Albums extends Component {
  info: AlbumProps = {
    title: 'Nowy album',
    desc: 'Bardzo fajny album z naszej młodości.',
    timeStart: '01-02-2000',
    timeEnd: '22-12-2012',
  };

  state = {
    showModalAddAlbum: false,
    title: '',
    desc: '',
    timeStart: '',
    timeEnd: '',
    albums: [this.info, this.info],
  };

  toggleShowModal = (): void =>
    this.setState({
      showModalAddAlbum: !this.state.showModalAddAlbum,
      title: '',
      desc: '',
      timeStart: '',
      timeEnd: '',
    });

  handleInputChange = (e: FormEvent<HTMLInputElement>): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const state: any = {};
    state[`${e.currentTarget.id}`] = e.currentTarget.value;
    this.setState(state);
  };

  addAlbum = (): void => {
    const { showModalAddAlbum, albums, ...albumToAddData } = this.state;
    this.setState({ albums: [...this.state.albums, albumToAddData], showModalAddAlbum: false });
  };

  render() {
    return (
      <View
        handleInputChange={this.handleInputChange}
        showModalAddAlbum={this.state.showModalAddAlbum}
        toggleShowModal={this.toggleShowModal}
        albumsArr={this.state.albums}
        addAlbum={this.addAlbum}
      ></View>
    );
  }
}

export default Albums;
