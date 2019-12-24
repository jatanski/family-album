import React from 'react';
import PhotoToAdd from './AddPhoto.photos.photoToAdd';
import { GalleryPropsI } from '../../AddPhoto.types';

const Gallery = ({ photos, handleDescInput, handleDateInput, deletePhoto, dates }: GalleryPropsI) => (
	<div className="addPhoto__wrapper__photos">
		{photos.map((photo: HTMLImageElement, i: number) => (
			<PhotoToAdd
				deletePhoto={deletePhoto}
				handleDescInput={handleDescInput}
				handleDateInput={handleDateInput}
				photo={photo}
				key={i}
				index={i}
				date={dates[i]}
			/>
		))}
	</div>
);

export default Gallery;
