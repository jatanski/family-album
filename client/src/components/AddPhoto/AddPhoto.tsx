import React, { Component, createRef, SyntheticEvent, RefObject, FormEvent } from 'react';
import View from './View';
import BaseModel from '../../utils/baseModel';
import { AddPhotoState, handleDescInputState } from './types';

class AddPhoto extends Component<{}, AddPhotoState> {
  state = {
    images: [],
    desc: [],
  };

  private endpoint: string = 'image';

  public fileInput: RefObject<HTMLInputElement> = createRef();

  public handleFileInput = (): void => {
    // @ts-ignore
    const photos = Array.from(this.fileInput.current?.files);

    this.setState({ images: [...this.state.images, ...photos] });
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

    return photoData;
  };

  render() {
    console.log(this.state);
    return (
      <View
        photos={this.state.images}
        submitForm={this.submitPhotos}
        handleFileInput={this.handleFileInput}
        handleDescInput={this.handleDescInput}
        ref={this.fileInput}
      ></View>
    );
  }
}

export default AddPhoto;
