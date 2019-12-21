import React from 'react';
import { WatchPhotoProps } from './types';
import AlbumMain from '../Utils/AlbumMain';
import AlbumButtons from './utils/WatchPhotos.buttons';

const View = ({ albums }: WatchPhotoProps) => (
  <>
    {albums
      ? albums.map(album => (
          <AlbumMain key={album._id} {...album}>
            <AlbumButtons />
          </AlbumMain>
        ))
      : null}
  </>
);

export default View;
