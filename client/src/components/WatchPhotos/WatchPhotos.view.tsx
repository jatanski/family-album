import React from 'react';
import { WatchPhotoProps } from './WatchPhotos.types';
import AlbumMain from '../Utils/AlbumMain';
import AlbumButtons from './utils/WatchPhotos.buttons';

const View = ({ albums, setSelectedAlbum }: WatchPhotoProps) => (
	<>
		{albums &&
			albums.map(album => (
				<AlbumMain key={album._id} {...album}>
					<AlbumButtons id={album._id} setSelectedAlbum={setSelectedAlbum} />
				</AlbumMain>
			))}
	</>
);

export default View;
