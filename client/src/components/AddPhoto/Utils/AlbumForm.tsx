import React from 'react';
import { AlbumFormProps } from '../types';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';

const AlbumForm = ({ children }: AlbumFormProps) => {
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol>
          <form action="submit">{children}</form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default AlbumForm;
