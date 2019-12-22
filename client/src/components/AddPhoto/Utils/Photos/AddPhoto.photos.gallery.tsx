import React from 'react';
import PhotoToAdd from './AddPhoto.photos.photoToAdd';
import { GalleryPropsI } from '../../AddPhoto.types';

const Gallery = ({ photos, handleDescInput, handleDateInput, deletePhoto }: GalleryPropsI) => {
	return photos.map((photo: HTMLImageElement, i: number) => {
		return (
			<PhotoToAdd
				deletePhoto={deletePhoto}
				handleDescInput={handleDescInput}
				handleDateInput={handleDateInput}
				photo={photo}
				key={i}
				index={i}
			></PhotoToAdd>
		);
	});
};

export default Gallery;
