import React, { useState } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBInput } from 'mdbreact';

const PhotoToAdd = ({ photo }: any) => {
  const [showInput, setShowInput] = useState(false);

  const toggleInput = () => setShowInput(!showInput);

  const photoToRead = URL.createObjectURL(photo);
  return (
    <MDBCol>
      <MDBCard style={{ width: '14rem' }}>
        <MDBCardImage className="img-fluid" src={photoToRead} waves />
        <MDBCardBody>
          <MDBBtn size="sm" onClick={toggleInput}>
            Dodaj opis
          </MDBBtn>
          {showInput ? <MDBInput label="Opis" icon="image" type="textarea" /> : null}
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};

export default PhotoToAdd;
