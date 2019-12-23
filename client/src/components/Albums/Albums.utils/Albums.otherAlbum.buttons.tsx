import React, { FC } from 'react';
import { MDBBtn } from 'mdbreact';
import { AlbumTypeAndSetAlbum } from '../Album.types';

const AlbumButtons: FC<AlbumTypeAndSetAlbum> = ({ addUserToOtherAlbum, _id }) => (
	<div className="albums__wrap--el--buttons">
		<MDBBtn onClick={addUserToOtherAlbum} id={_id} color="yellow" size="sm">
			Dołącz do albumu
		</MDBBtn>
	</div>
);

export default AlbumButtons;
