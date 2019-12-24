import React, { useState } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBInput, MDBIcon } from 'mdbreact';
import { PhotoPropsI } from '../../AddPhoto.types';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../redux/reducers';
import Loader from '../../../Loader/Loader';

const PhotoToAdd = ({ photo, handleDescInput, handleDateInput, index, deletePhoto, date }: PhotoPropsI) => {
	const [showInputDescOrButton, setShowInputDescOrButton] = useState(false);
	const [showInputDateOrButton, setShowInputDateOrButton] = useState(false);

	const toggleInputDesc = (): void => setShowInputDescOrButton(!showInputDescOrButton);
	const toggleInputDate = (): void => setShowInputDateOrButton(!showInputDateOrButton);

	const photoToRead: string = URL.createObjectURL(photo);

	const indexInString: string = index.toString();
	const isFetching = useSelector((state: AppState) => state.areUploadImageRequestsStarted.get(index, false));
	console.log(date);
	return (
		<MDBCol>
			<MDBCard className="addPhoto__wrapper--photo" style={{ width: '14rem' }}>
				{isFetching && <Loader />}
				<MDBCardImage className="img-fluid" src={photoToRead} waves />
				<MDBCardBody className="addPhoto__wrapper__body">
					<MDBBtn size="sm" color="brown" id={indexInString} onClick={deletePhoto}>
						<MDBIcon icon="times" /> {''}
						Usuń
					</MDBBtn>
					<div className="addPhoto__wrapper__body--inputs">
						{showInputDescOrButton ? (
							<MDBInput
								name={indexInString}
								onChange={handleDescInput}
								label="Opis"
								icon="edit"
								type="textarea"
							/>
						) : (
							<MDBBtn size="sm" onClick={toggleInputDesc}>
								<MDBIcon icon="pen" /> {''}
								Dodaj opis
							</MDBBtn>
						)}
						{showInputDateOrButton ? (
							<MDBInput
								name={indexInString}
								onChange={handleDateInput}
								label="Data"
								icon="calendar-alt"
								type="date"
								value={date}
							/>
						) : (
							<MDBBtn onClick={toggleInputDate} size="sm" color="orange">
								<MDBIcon icon="calendar-plus" /> {''}
								Dodaj date
							</MDBBtn>
						)}
					</div>
				</MDBCardBody>
			</MDBCard>
		</MDBCol>
	);
};

export default PhotoToAdd;
