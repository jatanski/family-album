import React, { FC } from 'react';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import { AlbumType } from '../Albums/types';

const Album: FC<AlbumType> = ({ name, description, beginningDate, endDate, children }) => (
  <div className="albums__wrap--el">
    <MDBCol>
      <MDBCard style={{ width: '19rem', height: '18rem' }}>
        <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/42.jpg" waves />
        <MDBCardBody>
          <MDBCardTitle>{name}</MDBCardTitle>
          <MDBCardText>{description}</MDBCardText>
          <MDBCardText>Pierwszy dzień: {beginningDate}</MDBCardText>
          <MDBCardText>Ostatni dzień: {endDate}</MDBCardText>
          {children}
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  </div>
);

export default Album;
