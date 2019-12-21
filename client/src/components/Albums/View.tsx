import React, { FC } from 'react';
import { MDBBtn, MDBJumbotron } from 'mdbreact';
import { AlbumViewProps, AlbumType } from './types';
import './albums.scss';
import Portal from '../Utils/Portal';
import Album from './Albums.utils/Albums.album';
import AddNewAlbum from './Albums.utils/AddNewAlbum/AddNewAlbum';

const View: FC<AlbumViewProps> = ({
  albumsArr,
  toggleShowModal,
  showModalAddAlbum,
  handleInputChange,
  addAlbum,
  setAlbum,
}) => {
  return (
    <>
      <div className="albums__addButton">
        <MDBBtn onClick={toggleShowModal} color="secondary">
          Dodaj nowy album
        </MDBBtn>
      </div>
      <MDBJumbotron>
        <h2 className="albums__header">Twoje albumy</h2>
        <div className="albums__wrap">
          <div className="albums__wrap--newAlbumButton"></div>
          {albumsArr
            ? albumsArr.map((album: AlbumType, index) => <Album key={index} {...album} setAlbum={setAlbum}></Album>)
            : null}
        </div>
      </MDBJumbotron>
      <MDBJumbotron>
        {
          <h2>Here will be albums others users</h2>
          // here will be albums others users
        }
      </MDBJumbotron>
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
