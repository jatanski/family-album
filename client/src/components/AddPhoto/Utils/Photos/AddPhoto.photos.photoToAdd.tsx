import React, { useState } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBInput, MDBIcon } from 'mdbreact';
import { PhotoPropsI } from '../../AddPhoto.types';

const PhotoToAdd = ({ photo, handleDescInput, handleDateInput, index, deletePhoto }: PhotoPropsI) => {
	const [showInputDescOrButton, setShowInputDescOrButton] = useState(false);
	const [showInputDateOrButton, setShowInputDateOrButton] = useState(false);

	const toggleInputDesc = (): void => setShowInputDescOrButton(!showInputDescOrButton);
	const toggleInputDate = (): void => setShowInputDateOrButton(!showInputDateOrButton);

	const photoToRead: string = URL.createObjectURL(photo);

	const indexInString: string = index.toString();

	return (
		<MDBCol>
			<MDBCard style={{ width: '14rem' }}>
				<MDBCardImage className="img-fluid" src={photoToRead} waves />
				<MDBCardBody>
					{showInputDescOrButton ? (
						<MDBInput
							name={indexInString}
							onChange={handleDescInput}
							label="Opis"
							icon="image"
							type="textarea"
						/>
					) : (
						<MDBBtn size="sm" onClick={toggleInputDesc}>
							Dodaj opis
						</MDBBtn>
					)}
					<MDBIcon id={indexInString} onClick={deletePhoto} icon="times" />

					{showInputDateOrButton ? (
						<MDBInput
							name={indexInString}
							onChange={handleDateInput}
							label="Data"
							icon="date"
							type="date"
						/>
					) : (
						<MDBBtn onClick={toggleInputDate} size="sm" color="orange">
							Dodaj date
						</MDBBtn>
					)}
				</MDBCardBody>
			</MDBCard>
		</MDBCol>
	);
};

export default PhotoToAdd;
