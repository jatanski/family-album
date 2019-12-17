import React, { FC } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import { AlbumProps } from '../types';

const Album: FC<AlbumProps> = ({ title, desc, timeEnd, timeStart }) => {
  return (
    <div className="albums__wrap--el">
      <MDBCol>
        <MDBCard style={{ width: '20rem' }}>
          <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" waves />
          <MDBCardBody>
            <MDBCardTitle>{title}</MDBCardTitle>
            <MDBCardText>{desc}</MDBCardText>
            <MDBCardText>Pierwszy dzień: {timeStart}</MDBCardText>
            <MDBCardText>Ostatni dzień: {timeEnd}</MDBCardText>

            <MDBBtn href="#">Obejrzyj</MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </div>
  );
};

export default Album;
