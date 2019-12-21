import { combineReducers } from 'redux';
import albumReducer from './album';

const rootReducer = combineReducers({
  album: albumReducer,
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;
