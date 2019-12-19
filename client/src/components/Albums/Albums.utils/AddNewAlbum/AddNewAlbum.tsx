import React, { FC } from 'react';
import { MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';
import { AddAlbumModalProps } from '../../types';
import Form from './Form';

const AddNewAlbum: FC<AddAlbumModalProps> = props => {
  const { show, toggle } = props;
  return (
    <MDBModal isOpen={show} toggle={toggle}>
      <MDBModalHeader toggle={toggle}>Dodaj album</MDBModalHeader>
      <MDBModalBody>
        <Form {...props}></Form>
      </MDBModalBody>
    </MDBModal>
  );
};

export default AddNewAlbum;
