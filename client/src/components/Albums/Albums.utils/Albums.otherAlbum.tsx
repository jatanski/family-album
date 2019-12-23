import React, { FC } from 'react';
import { AlbumTypeAndSetAlbum } from '../Album.types';
import AlbumMain from '../../Utils/AlbumMain';
import OtherAlbumButtons from './Albums.otherAlbum.buttons';

const Album: FC<AlbumTypeAndSetAlbum> = props => (
	<AlbumMain {...props}>
		<OtherAlbumButtons {...props}></OtherAlbumButtons>
	</AlbumMain>
);

export default Album;
