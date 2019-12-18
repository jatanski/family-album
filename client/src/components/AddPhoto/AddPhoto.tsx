import React, { Component, createRef, FormEvent, SyntheticEvent } from 'react';
import View from './View';
import BaseModel from '../../utils/baseModel';

class AddPhoto extends Component {
  private endpoint: string = 'image';

  public fileInput = createRef<HTMLInputElement>();

  public handleFileInput = (e: FormEvent<HTMLInputElement>): void => {
    console.log(this.fileInput.current?.files);
  };

  public sendImageToServer = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const image = this.fileInput.current;

    const formData = new FormData();
    // @ts-ignore
    formData.append('file', image?.files[0]);
    formData.append('name', 'some value');
    formData.append('description', 'some value');

    try {
      const response = await fetch(BaseModel.baseApiUrl + this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        body: formData,
      });

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    return <View handleFileInput={this.handleFileInput} ref={this.fileInput}></View>;
  }
}

export default AddPhoto;
