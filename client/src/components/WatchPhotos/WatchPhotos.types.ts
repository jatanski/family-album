import { AlbumType } from '../Albums/Album.types';
import { SyntheticEvent } from 'react';

export interface WatchPhotosState {
	albums: Array<AlbumType>;
	cover: [];
}

export interface WatchPhotoProps {
	albums: Array<AlbumType>;
	setSelectedAlbum: (e: SyntheticEvent<HTMLButtonElement>) => void;
}

export interface WatchPhotosAlbumButtonsProps {
	setSelectedAlbum: (e: SyntheticEvent<HTMLButtonElement>) => void;
	id: string | undefined;
}
