import React, { FC } from 'react';
import { MDBBtn } from 'mdbreact';
import { ViewProps, AlbumProps } from './types';
import Portal from '../Utils/Portal';
import Album from './Albums.utils/Albums.album';
import AddNewAlbum from './Albums.utils/AddNewAlbum/AddNewAlbum';

const View: FC<ViewProps> = ({ albumsArr, toggleShowModal, showModalAddAlbum, handleInputChange, addAlbum }) => {
  return (
    <>
      <div className="albums__addButton">
        <MDBBtn onClick={toggleShowModal} color="secondary">
          Dodaj nowy album
        </MDBBtn>
      </div>
      <div className="albums__wrap">
        <div className="albums__wrap--newAlbumButton"></div>
        {albumsArr ? albumsArr.map((album: AlbumProps, index) => <Album key={index} {...album}></Album>) : null}
      </div>
      <Portal>
        <AddNewAlbum
          handleInputChange={handleInputChange}
          toggle={toggleShowModal}
          show={showModalAddAlbum}
          addAlbum={addAlbum}
        ></AddNewAlbum>
      </Portal>
    </>
  );
};

export default View;
