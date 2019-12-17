import React, { FC } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { AddAlbumModalProps } from '../../types';

const AddAlbumForm: FC<AddAlbumModalProps> = ({ handleInputChange, addAlbum }) => {
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol>
          <form>
            <div className="grey-text">
              <MDBInput onChange={handleInputChange} id="title" label="Nazwa" icon="images" group type="text" />
              <MDBInput onChange={handleInputChange} id="desc" label="Opis" icon="pen-nib" group type="textarea" />
              <MDBInput
                onChange={handleInputChange}
                id="startTime"
                label="Data początkowa"
                icon="calendar-alt"
                group
                type="text"
              />
              <MDBInput
                onChange={handleInputChange}
                id="endTime"
                label="Data końcowa"
                icon="calendar"
                group
                type="text"
              />
            </div>
            <div className="text-center">
              <MDBBtn onClick={addAlbum}>Dodaj album</MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default AddAlbumForm;
