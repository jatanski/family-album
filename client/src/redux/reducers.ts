import { combineReducers } from 'redux';
import albumReducer from './album';
import { isLoginRequestStarted, areUploadImageRequestsStarted } from './request/reducers';

const rootReducer = combineReducers({
	album: albumReducer,
	isLoginRequestStarted,
	areUploadImageRequestsStarted,
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;
