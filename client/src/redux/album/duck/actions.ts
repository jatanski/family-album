import types from './types';
import { AlbumType } from '../../../components/Albums/Album.types';

const setSelectedAlbum = (item: string) => ({
  type: types.SET_SELECTED_ALBUM,
  item,
});

const saveAlbums = (item: AlbumType) => ({
  type: types.SAVE_ALBUMS,
  item,
});

export default {
  setSelectedAlbum,
  saveAlbums,
};
