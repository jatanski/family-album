import React, { FC } from 'react';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import { AlbumType } from '../Albums/Album.types';

const Album: FC<AlbumType> = ({ name, description, beginningDate, endDate, children, _id }) => {
	const randomCover = `https://mdbootstrap.com/img/Photos/Others/images/${Math.floor(Math.random() * 99)}.jpg`;

	const cover = `http://localhost:3069/album/${_id}/cover`;
	console.log(cover);
	return (
		<div className="albums__wrap--el">
			<MDBCol>
				<MDBCard style={{ width: '19rem', height: '20rem' }}>
					<MDBCardImage className="img-fluid" src={cover} waves />
					<MDBCardBody className="albumCardBody">
						<MDBCardTitle>{name}</MDBCardTitle>
						<MDBCardText>{description}</MDBCardText>
						<MDBCardText>{beginningDate && <span>Pierwszy dzień: {beginningDate}</span>}</MDBCardText>
						<MDBCardText>{endDate && <span>Ostatni dzień: {endDate}</span>}</MDBCardText>
						{children}
					</MDBCardBody>
				</MDBCard>
			</MDBCol>
		</div>
	);
};

export default Album;
