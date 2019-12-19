import React, { ChangeEvent } from 'react';
import { AddPhotoAlbum } from '../../types';

type SelectAlbumInputProps = {
  albums: Array<AddPhotoAlbum>;
  handleSelectAlbumInput: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const SelectAlbumInput = ({ albums, handleSelectAlbumInput }: SelectAlbumInputProps) => (
  <select onChange={handleSelectAlbumInput} className="browser-default custom-select">
    {albums.map((album, i) => (
      <option key={i} value={album.id}>
        {album.name}
      </option>
    ))}
  </select>
);

export default SelectAlbumInput;
