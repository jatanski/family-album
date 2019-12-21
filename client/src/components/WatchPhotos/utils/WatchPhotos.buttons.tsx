import React from 'react';
import { MDBBtn } from 'mdbreact';
import { Link } from 'react-router-dom';

const WatchPhotosAlbumButtons = () => {
  return (
    <div className="albums__wrap--el--buttons">
      <Link to="miniatures">
        <MDBBtn color="red" size="sm">
          Zobasz wszystkie
        </MDBBtn>
      </Link>
      <Link to="carousel">
        <MDBBtn color="green" size="sm">
          Oglądaj po kolei
        </MDBBtn>
      </Link>
    </div>
  );
};

export default WatchPhotosAlbumButtons;
