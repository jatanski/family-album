import React, { forwardRef, Ref } from 'react';
import { ViewProps } from './AddPhoto.types';
import FileInput from './Utils/Form/AddPhoto.form.fileInput';
import SelectAlbumInput from './Utils/Form/AddPhoto.form.selectAlbumInput';
import AlbumForm from './Utils/Form/AddPhoto.form.albumForm';
import Gallery from './Utils/Photos/AddPhoto.photos.gallery';

const View = forwardRef(function AddPhotoView(
	{
		handleFileInput,
		handleDescInput,
		handleDateInput,
		handleSelectAlbumInput,
		photos,
		submitForm,
		albums,
		selectedAlbum,
		deletePhoto,
	}: ViewProps,
	ref: Ref<HTMLInputElement>,
) {
	return (
		<>
			<AlbumForm submitForm={submitForm}>
				<SelectAlbumInput
					handleSelectAlbumInput={handleSelectAlbumInput}
					selectedAlbum={selectedAlbum}
					albums={albums}
				/>
				<FileInput handleFileInput={handleFileInput} ref={ref} />
			</AlbumForm>
			<Gallery
				deletePhoto={deletePhoto}
				handleDescInput={handleDescInput}
				handleDateInput={handleDateInput}
				photos={photos}
			></Gallery>
		</>
	);
});

export default View;
