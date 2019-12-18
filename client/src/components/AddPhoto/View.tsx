import React, { forwardRef } from 'react';
import { ViewProps } from './types';
import FileInput from './Utils/Form/FileInput';
import SelectAlbumInput from './Utils/Form/SelectAlbumInput';
import AlbumForm from './Utils/Form/AlbumForm';
import Gallery from './Utils/Photos/Gallery';

const View = forwardRef(({ handleFileInput, photos, submitForm }: ViewProps, ref: any) => {
  return (
    <>
      <AlbumForm submitForm={submitForm}>
        <SelectAlbumInput />
        <FileInput handleFileInput={handleFileInput} ref={ref} />
      </AlbumForm>
      <Gallery photos={photos}></Gallery>
    </>
  );
});

export default View;
