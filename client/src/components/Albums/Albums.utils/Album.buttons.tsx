import React, { FC } from 'react';
import { MDBBtn } from 'mdbreact';
import { AlbumTypeAndSetAlbum } from '../types';
import { Link } from 'react-router-dom';

const AlbumButtons: FC<AlbumTypeAndSetAlbum> = ({ setAlbum, _id }) => (
  <div className="albums__wrap--el--buttons">
    <MDBBtn color="red" size="sm" href="#">
      Obejrzyj
    </MDBBtn>
    <Link to="add">
      <MDBBtn onClick={setAlbum} id={_id} color="indigo" size="sm" href="#">
        Dodaj zdjęcia
      </MDBBtn>
    </Link>
  </div>
);

export default AlbumButtons;
