import React, { forwardRef, Ref } from 'react';
import { ViewProps } from './types';
import FileInput from './Utils/Form/FileInput';
import SelectAlbumInput from './Utils/Form/SelectAlbumInput';
import AlbumForm from './Utils/Form/AlbumForm';
import Gallery from './Utils/Photos/Gallery';

const View = forwardRef(
  (
    { handleFileInput, handleDescInput, handleSelectAlbumInput, photos, submitForm, albums }: ViewProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    return (
      <>
        <AlbumForm submitForm={submitForm}>
          <SelectAlbumInput handleSelectAlbumInput={handleSelectAlbumInput} albums={albums} />
          <FileInput handleFileInput={handleFileInput} ref={ref} />
        </AlbumForm>
        <Gallery handleDescInput={handleDescInput} photos={photos}></Gallery>
      </>
    );
  },
);

export default View;
