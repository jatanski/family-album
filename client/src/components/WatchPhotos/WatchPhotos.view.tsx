import React from 'react';
import { WatchPhotoProps } from './WatchPhotos.types';
import AlbumMain from '../Utils/AlbumMain';
import AlbumButtons from './utils/WatchPhotos.buttons';
import './watchPhotos.scss';
import { MDBJumbotron } from 'mdbreact';

const View = ({ albums, setSelectedAlbum }: WatchPhotoProps) => (
	<>
		{albums && (
			<MDBJumbotron>
				<div className="watchPhotos__wrap">
					{albums ? (
						albums.map(album => (
							<AlbumMain key={album._id} {...album}>
								<AlbumButtons id={album._id} setSelectedAlbum={setSelectedAlbum} />
							</AlbumMain>
						))
					) : (
						<h3>Dodaj album, aby móc przeglądać zdjęcia</h3>
					)}
				</div>
			</MDBJumbotron>
		)}
	</>
);

export default View;
