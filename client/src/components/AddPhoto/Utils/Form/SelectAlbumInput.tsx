import React, { ChangeEvent } from 'react';
import { AlbumType } from '../../../Albums/types';

type SelectAlbumInputProps = {
  albums: Array<AlbumType>;
  handleSelectAlbumInput: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const SelectAlbumInput = ({ albums, handleSelectAlbumInput }: SelectAlbumInputProps) => (
  <select onChange={handleSelectAlbumInput} className="browser-default custom-select">
    <option>Wybierz album</option>
    {albums.map((album, i) => (
      <option key={i} value={album._id}>
        {album.name}
      </option>
    ))}
  </select>
);

export default SelectAlbumInput;
