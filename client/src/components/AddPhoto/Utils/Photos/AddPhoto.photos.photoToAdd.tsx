import React, { useState } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBInput } from 'mdbreact';
import { PhotoPropsI } from '../../AddPhoto.types';

const PhotoToAdd = ({ photo, handleDescInput, index }: PhotoPropsI) => {
	const [showInputOrButton, setShowInputOrButton] = useState(false);

	const toggleInput = (): void => setShowInputOrButton(!showInputOrButton);

	const photoToRead: string = URL.createObjectURL(photo);

	const indexToString: string = index.toString();

	return (
		<MDBCol>
			<MDBCard style={{ width: '14rem' }}>
				<MDBCardImage className="img-fluid" src={photoToRead} waves />
				<MDBCardBody>
					{showInputOrButton ? (
						<MDBInput
							id={indexToString}
							onChange={handleDescInput}
							label="Opis"
							icon="image"
							type="textarea"
						/>
					) : (
						<MDBBtn size="sm" onClick={toggleInput}>
							Dodaj opis
						</MDBBtn>
					)}
				</MDBCardBody>
			</MDBCard>
		</MDBCol>
	);
};

export default PhotoToAdd;
