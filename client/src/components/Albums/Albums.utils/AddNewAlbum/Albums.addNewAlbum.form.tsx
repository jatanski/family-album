import React, { FC } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { AddAlbumModalProps } from '../../Album.types';

const AddAlbumForm: FC<AddAlbumModalProps> = ({ handleInputChange, addAlbum }) => {
	return (
		<MDBContainer>
			<MDBRow>
				<MDBCol>
					<form>
						<div className="grey-text">
							<MDBInput
								onChange={handleInputChange}
								id="name"
								label="Nazwa"
								icon="images"
								group
								type="text"
							/>
							<MDBInput
								onChange={handleInputChange}
								id="description"
								label="Opis"
								icon="pen-nib"
								group
								type="textarea"
							/>
							<MDBInput
								onChange={handleInputChange}
								id="beginningDate"
								label="Data początkowa"
								icon="calendar-alt"
								group
								type="date"
							/>
							<MDBInput
								onChange={handleInputChange}
								id="endDate"
								label="Data końcowa"
								icon="calendar"
								group
								type="date"
							/>
						</div>
						<div className="text-center">
							<MDBBtn onClick={addAlbum} className="buttonPrimary">
								Dodaj album
							</MDBBtn>
						</div>
					</form>
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	);
};

export default AddAlbumForm;
