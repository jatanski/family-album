import SET_ALBUM from './types';

const setAlbum = (item: string) => ({
  type: SET_ALBUM,
  item,
});

export default {
  setAlbum,
};
