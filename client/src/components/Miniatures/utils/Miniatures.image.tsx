import React, { FC } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { MiniaturesImageProps } from '../Miniatures.types';

const Images: FC<MiniaturesImageProps> = ({ image }) => {
  const src: string = `http://localhost:3069/image/${image}/miniature`;
  return (
    <MDBContainer className="mt-5">
      <MDBRow className="mb-4">
        <MDBCol md="4">
          <img src={src} className="img-fluid" alt="" />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Images;
