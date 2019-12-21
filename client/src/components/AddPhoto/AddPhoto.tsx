import React, { Component, createRef, SyntheticEvent, RefObject, FormEvent, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/reducers';
import View from './View';
import BaseModel from '../../utils/baseModel';
import { AddPhotoState, handleDescInputState } from './types';
import AlbumService from '../Albums/albums.service';

class AddPhoto extends Component<any, AddPhotoState> {
  readonly albumService = new AlbumService();
  private endpoint: string = 'image';
  public fileInput: RefObject<HTMLInputElement> = createRef();

  state = {
    images: [],
    desc: [],
    albums: [],
    selectedAlbum: '',
    sendedImages: 0,
  };

  componentDidMount = () => {
    this.saveDownloadAlbumsToState();
    this.setSelectedAlbum();
  };

  private saveDownloadAlbumsToState = async (): Promise<void> => {
    const albums = await this.albumService.downloadAllAlbums();
    this.setState({ albums: albums });
  };

  private setSelectedAlbum = () => {
    const selectedAlbum = this.props.album.album;

    this.setState({ selectedAlbum: selectedAlbum });
  };

  componentDidUpdate = (prevState: AddPhotoState): void => {
    if (prevState.sendedImages !== this.state.sendedImages) this.clearImagesInStateAfterSendToServer();
  };

  private clearImagesInStateAfterSendToServer = (): void => {
    if (this.state.sendedImages === this.state.images.length && this.state.images.length !== 0) {
      this.setState({ images: [], desc: [] });
    }
  };
  public handleSelectAlbumInput = (e: ChangeEvent<HTMLSelectElement>): void =>
    this.setState({ selectedAlbum: e.target.value });

  public handleFileInput = (): void => {
    // @ts-ignore
    const photos = Array.from(this.fileInput.current?.files);
    this.setState({ images: [...this.state.images, ...photos] });
  };

  public handleDescInput = (e: FormEvent<HTMLInputElement>): void => {
    const imageIndex: number = parseInt(e.currentTarget.id);

    const state: handleDescInputState = { desc: this.state.desc };
    state.desc[imageIndex] = e.currentTarget.value;
    this.setState(state);
  };

  public submitPhotos = async (e: SyntheticEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();

    try {
      this.state.images.forEach(async (image, i) => {
        await this.sendImageToServer(image, i);
      });
    } catch (error) {
      console.log(error);
    }
  };

  private sendImageToServer = async (photo: HTMLImageElement, photoIndex: number): Promise<void> => {
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

  private createPhotoData = (photo: any, photoIndex: number): FormData => {
    const photoData = new FormData();

    photoData.append('file', photo);
    photoData.append('description', this.state.desc[photoIndex]);
    photoData.append('albumId', this.state.selectedAlbum);

    return photoData;
  };

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
        handleSelectAlbumInput={this.handleSelectAlbumInput}
      ></View>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  album: state.album,
});

export default connect(mapStateToProps, {})(AddPhoto);
