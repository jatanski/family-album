import React, { FC } from 'react';
import { SelectAlbumInputProps } from '../../AddPhoto.types';

const SelectAlbumInput: FC<SelectAlbumInputProps> = ({ albums, handleSelectAlbumInput, selectedAlbum }) => (
	<select value={selectedAlbum} onChange={handleSelectAlbumInput} className="browser-default custom-select">
		<option>Wybierz album</option>
		{albums.map((album, i) => (
			<option key={i} value={album._id}>
				{album.name}
			</option>
		))}
	</select>
);

export default SelectAlbumInput;
