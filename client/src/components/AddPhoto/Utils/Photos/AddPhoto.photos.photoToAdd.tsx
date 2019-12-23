import React, { useState } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBInput, MDBIcon } from 'mdbreact';
import { PhotoPropsI } from '../../AddPhoto.types';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../redux/reducers';
import Loader from '../../../Loader/Loader';

const PhotoToAdd = ({ photo, handleDescInput, handleDateInput, index, deletePhoto }: PhotoPropsI) => {
	const [showInputDescOrButton, setShowInputDescOrButton] = useState(false);
	const [showInputDateOrButton, setShowInputDateOrButton] = useState(false);

	const toggleInputDesc = (): void => setShowInputDescOrButton(!showInputDescOrButton);
	const toggleInputDate = (): void => setShowInputDateOrButton(!showInputDateOrButton);

	const photoToRead: string = URL.createObjectURL(photo);

	const indexInString: string = index.toString();
	const isFetching = useSelector((state: AppState) => state.areUploadImageRequestsStarted.get(index, false));

	return (
		<MDBCol>
			<MDBCard style={{ width: '14rem' }}>
				{isFetching && <Loader />}
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
						<MDBBtn size="sm" onSubmit={toggleInputDesc}>
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
						<MDBBtn onSubmit={toggleInputDate} size="sm" color="orange">
							Dodaj date
						</MDBBtn>
					)}
				</MDBCardBody>
			</MDBCard>
		</MDBCol>
	);
};

export default PhotoToAdd;
