import SET_ALBUM from './types';

const ALBUM_STATE = {
  album: '',
};

const albumReducer = (state: any = ALBUM_STATE, action: any) => {
  switch (action.type) {
    case SET_ALBUM:
      return { album: action.item };
    default:
      return state;
  }
};

export default albumReducer;
