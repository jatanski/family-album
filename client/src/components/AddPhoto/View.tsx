import React, { forwardRef } from 'react';
import { ViewProps } from './types';
import FileInput from './Utils/FileInput';
import SelectAlbumInput from './Utils/SelectAlbumInput';
import AlbumForm from './Utils/AlbumForm';

const View = forwardRef((props: ViewProps, ref: any) => {
  return (
    <AlbumForm>
      <SelectAlbumInput />
      <FileInput {...props} ref={ref} />
    </AlbumForm>
  );
});

export default View;
