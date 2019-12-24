import React, { FC } from 'react';
import { MDBBtn, MDBJumbotron } from 'mdbreact';
import { AlbumViewProps, AlbumType } from './Album.types';
import './albums.scss';
import Portal from '../Utils/Portal';
import MyAlbum from './Albums.utils/Albums.myAlbum';
import OtherAlbum from './Albums.utils/Albums.otherAlbum';
import AddNewAlbum from './Albums.utils/AddNewAlbum/Albums.addNewAlbum';

const View: FC<AlbumViewProps> = ({
	myAlbums,
	otherAlbums,
	toggleShowModal,
	showModalAddAlbum,
	handleInputChange,
	addAlbum,
	setAlbum,
	addUserToOtherAlbum,
}) => (
	<>
		<div className="albums__addButton">
			<MDBBtn onClick={toggleShowModal} color="secondary" className="buttonPrimary">
				Dodaj nowy album
			</MDBBtn>
		</div>
		<MDBJumbotron>
			<h2 className="albums__header">Twoje albumy</h2>
			<div className="albums__wrap">
				{myAlbums &&
					myAlbums.map((album: AlbumType, index) => <MyAlbum key={index} {...album} setAlbum={setAlbum} />)}
			</div>
		</MDBJumbotron>
		{otherAlbums.length !== 0 && (
			<MDBJumbotron>
				<h2 className="albums__header">Albumy innych osób, do których możesz dołączyć i dodać swoje zdjęcia</h2>
				<div className="albums__wrap">
					{otherAlbums.map((album: AlbumType, index) => (
						<OtherAlbum key={index} {...album} addUserToOtherAlbum={addUserToOtherAlbum} />
					))}
				</div>
			</MDBJumbotron>
		)}
		<Portal>
			<AddNewAlbum
				handleInputChange={handleInputChange}
				toggle={toggleShowModal}
				show={showModalAddAlbum}
				addAlbum={addAlbum}
			/>
		</Portal>
	</>
);

export default View;
