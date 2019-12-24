import React, { FC } from 'react';
import { MDBBtn } from 'mdbreact';
import { AlbumTypeAndSetAlbum } from '../Album.types';
import { Link } from 'react-router-dom';

const AlbumButtons: FC<AlbumTypeAndSetAlbum> = ({ setAlbum, _id }) => {
	const linkToCarouselWithAlbumId = `carousel/${_id}`;
	return (
		<div className="albums__wrap--el--buttons">
			<Link to={linkToCarouselWithAlbumId}>
				<MDBBtn onClick={setAlbum} id={_id} color="red" size="sm" className="buttonPrimary">
					Obejrzyj
				</MDBBtn>
			</Link>
			<Link to="add">
				<MDBBtn onClick={setAlbum} id={_id} color="indigo" size="sm" className="buttonSecondary">
					Dodaj zdjęcia
				</MDBBtn>
			</Link>
		</div>
	);
};

export default AlbumButtons;
