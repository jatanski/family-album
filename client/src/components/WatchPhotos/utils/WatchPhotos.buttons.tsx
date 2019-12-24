import React from 'react';
import { MDBBtn } from 'mdbreact';
import { Link } from 'react-router-dom';
import { WatchPhotosAlbumButtonsProps } from '../WatchPhotos.types';

const WatchPhotosAlbumButtons = ({ setSelectedAlbum, id }: WatchPhotosAlbumButtonsProps) => {
	const linkToMiniaturesWithAlbumId = `miniatures/${id}`;
	const linkToCarouselWithAlbumId = `carousel/${id}`;

	return (
		<div className="albums__wrap--el--buttons">
			<Link to={linkToMiniaturesWithAlbumId}>
				<MDBBtn id={id} onClick={setSelectedAlbum} color="red" size="sm" className="buttonPrimary">
					Zobasz wszystkie
				</MDBBtn>
			</Link>
			<Link to={linkToCarouselWithAlbumId}>
				<MDBBtn id={id} onClick={setSelectedAlbum} color="green" size="sm" className="buttonThrimary">
					Oglądaj po kolei
				</MDBBtn>
			</Link>
		</div>
	);
};

export default WatchPhotosAlbumButtons;
