import React, { FC } from 'react';
import { MDBBtn } from 'mdbreact';
import { AlbumTypeAndSetAlbum } from '../Album.types';
import { Link } from 'react-router-dom';

const AlbumButtons: FC<AlbumTypeAndSetAlbum> = ({ setAlbum, _id }) => (
	<div className="albums__wrap--el--buttons">
		<Link to="carousel">
			<MDBBtn onClick={setAlbum} id={_id} color="red" size="sm">
				Obejrzyj
			</MDBBtn>
		</Link>
		<Link to="add">
			<MDBBtn onClick={setAlbum} id={_id} color="indigo" size="sm">
				Dodaj zdjęcia
			</MDBBtn>
		</Link>
	</div>
);

export default AlbumButtons;
