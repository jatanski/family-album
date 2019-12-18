import React, { Component, createRef, SyntheticEvent, RefObject } from 'react';
import View from './View';
import BaseModel from '../../utils/baseModel';

interface AddPhotoStateI {
  images: Array<HTMLInputElement>;
}

class AddPhoto extends Component<any, AddPhotoStateI> {
  state = {
    images: [],
  };

  private endpoint: string = 'image';

  public fileInput: RefObject<HTMLInputElement> = createRef();

  public handleFileInput = (): void => {
    // @ts-ignore
    this.setState({ images: [...this.state.images, this.fileInput.current?.files[0]] });
  };

  public sendImageToServer = async (e: SyntheticEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();

    const image = this.fileInput.current;

    const formData = new FormData();
    // @ts-ignore
    formData.append('file', image?.files[0]);
    formData.append('name', 'przykład');
    formData.append('description', 'przykład');

    const token = BaseModel.getAuthToken();
    if (token) {
      try {
        const response = await fetch(BaseModel.baseApiUrl + this.endpoint, {
          method: 'POST',
          headers: { 'x-token': token },
          body: formData,
        });

        if (response.status === 200) alert('Zdjęcia zostały zapisane');
      } catch (error) {
        console.error(error);
      }
    }
  };
  render() {
    console.log(this.state);
    return (
      <View
        photos={this.state.images}
        submitForm={this.sendImageToServer}
        handleFileInput={this.handleFileInput}
        ref={this.fileInput}
      ></View>
    );
  }
}

export default AddPhoto;
