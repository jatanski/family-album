import SET_ALBUM from './types';
import { AlbumType } from '../../../components/Albums/types';

const setAlbum = (item: string) => ({
  type: SET_ALBUM,
  item,
});

export default {
  setAlbum,
};
