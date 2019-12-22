import types, { AlbumStateType } from './types';

const ALBUM_STATE: AlbumStateType = {
	selectedAlbum: '',
	albums: [],
};

const albumReducer = (state = ALBUM_STATE, action: any) => {
	switch (action.type) {
		case types.SET_SELECTED_ALBUM:
			return { selectedAlbum: action.item };
		case types.SAVE_ALBUMS:
			return { albums: action.item };
		default:
			return state;
	}
};

export default albumReducer;
