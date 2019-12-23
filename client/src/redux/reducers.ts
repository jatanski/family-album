import { combineReducers } from 'redux';
import albumReducer from './album';
import {
	isLoginRequestStarted,
	areUploadImageRequestsStarted,
	isUpdateSuccessNotificationShowed,
} from './request/reducers';
import { token } from './token/token';

const rootReducer = combineReducers({
	album: albumReducer,
	isLoginRequestStarted,
	areUploadImageRequestsStarted,
	isUpdateSuccessNotificationShowed,
	token,
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;
