import React, { FC } from 'react';
import { MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';
import Form from './Form';
import { AddAlbumModalProps } from '../../types';

const AddNewAlbum: FC<AddAlbumModalProps> = ({ show, toggle, handleInputChange, addAlbum }) => {
  return (
    <MDBModal isOpen={show} toggle={toggle}>
      <MDBModalHeader toggle={toggle}>Dodaj album</MDBModalHeader>
      <MDBModalBody>
        <Form addAlbum={addAlbum} handleInputChange={handleInputChange}></Form>
      </MDBModalBody>
    </MDBModal>
  );
};

export default AddNewAlbum;
