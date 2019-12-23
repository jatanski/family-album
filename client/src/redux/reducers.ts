import { combineReducers } from 'redux';
import albumReducer from './album';
import {
	isLoginRequestStarted,
	areUploadImageRequestsStarted,
	isUpdateSuccessNotificationShowed,
} from './request/reducers';

const rootReducer = combineReducers({
	album: albumReducer,
	isLoginRequestStarted,
	areUploadImageRequestsStarted,
	isUpdateSuccessNotificationShowed,
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;
