import { combineReducers } from 'redux';
import albumReducer from './album';
import isLoginRequestStarted from './request';

const rootReducer = combineReducers({
	album: albumReducer,
	isLoginRequestStarted,
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;
