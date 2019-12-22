import { AlbumType } from '../../../components/Albums/Album.types';

const SET_SELECTED_ALBUM = 'SET_SELECTED_ALBUM';
const SAVE_ALBUMS = 'SAVE_ALBUMS';

export interface AlbumStateType {
	selectedAlbum?: string;
	albums?: Array<AlbumType>;
}

export default {
	SAVE_ALBUMS,
	SET_SELECTED_ALBUM,
};
