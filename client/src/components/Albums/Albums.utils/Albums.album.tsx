import React, { FC } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import { AlbumType } from '../types';

const Album: FC<AlbumType> = ({ name, description, beginningDate, endDate }) => {
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
              <MDBBtn color="indigo" size="sm" href="#">
                Dodaj zdjęcia
              </MDBBtn>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </div>
  );
};

export default Album;
