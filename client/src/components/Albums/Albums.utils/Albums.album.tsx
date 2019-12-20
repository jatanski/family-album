import React, { FC } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import { AlbumTypeAndSetAlbum } from '../types';
import { Link } from 'react-router-dom';

const Album: FC<AlbumTypeAndSetAlbum> = ({ name, description, beginningDate, endDate, _id, setAlbum }) => {
  return (
    <div className="albums__wrap--el">
      <MDBCol>
        <MDBCard style={{ width: '19rem', height: '18rem' }}>
          <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/42.jpg" waves />
          <MDBCardBody>
            <MDBCardTitle>{name}</MDBCardTitle>
            <MDBCardText>{description}</MDBCardText>
            <MDBCardText>Pierwszy dzień: {beginningDate}</MDBCardText>
            <MDBCardText>Ostatni dzień: {endDate}</MDBCardText>
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
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </div>
  );
};

export default Album;
