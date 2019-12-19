import React, { Component, createRef, SyntheticEvent, RefObject, FormEvent, ChangeEvent } from 'react';
import View from './View';
import BaseModel from '../../utils/baseModel';
import { AddPhotoState, handleDescInputState } from './types';

class AddPhoto extends Component<{}, AddPhotoState> {
  state = {
    images: [],
    desc: [],
    albums: [
      { name: 'Album 1', id: '123' },
      { name: 'Album 2', id: '234' },
    ],
    selectedAlbum: { name: 'Album 2', id: '234' },
  };

  private endpoint: string = 'image';

  public fileInput: RefObject<HTMLInputElement> = createRef();

  componentDidMount = () => {
    // download albums ...
  };

  public handleFileInput = (): void => {
    // @ts-ignore
    const photos = Array.from(this.fileInput.current?.files);

    this.setState({ images: [...this.state.images, ...photos] });
  };

  public handleSelectAlbumInput = (e: ChangeEvent<HTMLSelectElement>): void => {
    console.log(e.target.value);
  };

  public handleDescInput = (e: FormEvent<HTMLInputElement>): void => {
    const imageIndex: number = parseInt(e.currentTarget.id);

    const state: handleDescInputState = {
      desc: this.state.desc,
    };

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

        if (response.status === 200) console.log(`Zdjęcie numer ${photoIndex} zostało wysłane.`);
      } catch (error) {
        console.error(error);
      }
    }
  };

  private createPhotoData = (photo: any, photoIndex: number): FormData => {
    const photoData = new FormData();

    photoData.append('file', photo);
    photoData.append('description', this.state.desc[photoIndex]);
    photoData.append('albumId', this.state.selectedAlbum.id);

    console.log(photoData);

    return photoData;
  };

  render() {
    console.log(this.state);
    return (
      <View
        ref={this.fileInput}
        albums={this.state.albums}
        photos={this.state.images}
        submitForm={this.submitPhotos}
        handleFileInput={this.handleFileInput}
        handleDescInput={this.handleDescInput}
        handleSelectAlbumInput={this.handleSelectAlbumInput}
      ></View>
    );
  }
}

export default AddPhoto;
