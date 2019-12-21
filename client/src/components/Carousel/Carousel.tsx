import React, { Component } from 'react';
import View from './Carousel.view';
import { connect } from 'react-redux';
import { AppState } from '../../redux/reducers';
import { AlbumType } from '../Albums/Album.types';
import BaseModel from '../../utils/baseModel';
import { CarouselProps, CarouselState } from './Carousel.types';

class Carousel extends Component<CarouselProps, CarouselState> {
  albumEndpoint: string = `album/${this.props.selectedAlbum}`;

  state = {
    images: [],
  };

  componentDidMount = (): void => {
    this.downloadMiniatures();
  };

  downloadMiniatures = async (): Promise<void> => {
    const albumWithImageIds: AlbumType = await BaseModel.downloadAnythingWithBody(this.albumEndpoint);
    this.setState({ images: albumWithImageIds.images });
  };

  render() {
    return <View images={this.state.images}></View>;
  }
}

const mapStateToProps = (state: AppState) => ({
  selectedAlbum: state.album.selectedAlbum,
});

export default connect(mapStateToProps, {})(Carousel);
