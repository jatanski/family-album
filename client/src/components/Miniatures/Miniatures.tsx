import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MiniaturesState, MiniaturesProps } from './Miniatures.types';
import View from './Miniatures.view';
import BaseModel from '../../utils/baseModel';
import { AppState } from '../../redux/reducers';
import { AlbumType } from '../Albums/Album.types';

class Miniatures extends Component<MiniaturesProps, MiniaturesState> {
  albumEndpoint: string = `album/${this.props.selectedAlbum}`;

  state = {
    images: [],
  };

  componentDidMount(): void {
    this.downloadMiniatures();
  }

  private async downloadMiniatures(): Promise<void> {
    const albumWithImageIds: AlbumType = await BaseModel.downloadAnythingWithBody(this.albumEndpoint);
    this.setState({ images: albumWithImageIds.images });
  }

  render() {
    return <View images={this.state.images}></View>;
  }
}

const mapStateToProps = (state: AppState) => ({
  selectedAlbum: state.album.selectedAlbum,
});

export default connect(mapStateToProps, {})(Miniatures);
