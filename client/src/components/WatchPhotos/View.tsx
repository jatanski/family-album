import React from 'react';
import { AlbumType } from '../Albums/types';
import { MDBBtn } from 'mdbreact';
import AlbumMain from '../Utils/AlbumMain';

interface WatchPhotoProps {
  albums: Array<AlbumType>;
}

const View = ({ albums }: WatchPhotoProps) => {
  return (
    <>
      {albums
        ? albums.map(album => (
            <AlbumMain {...album}>
              <div className="albums__wrap--el--buttons">
                <MDBBtn color="red" size="sm" href="#">
                  Zobasz wszystkie
                </MDBBtn>
                <MDBBtn color="red" size="sm" href="#">
                  Oglądaj po kolei
                </MDBBtn>
              </div>
            </AlbumMain>
          ))
        : null}
    </>
  );
};

export default View;
