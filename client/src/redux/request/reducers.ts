import { List } from 'immutable';
import {
	ActionType,
	LOGIN_REQUEST_STARTED,
	LOGIN_REQUEST_ENDED,
	UPLOAD_IMAGES_REQUEST_RESET,
	UPLOAD_IMAGE_REQUEST_START,
	UPLOAD_IMAGE_REQUEST_END,
} from './types';

const defaultLoginState = false;

export function isLoginRequestStarted(state: boolean = defaultLoginState, action: ActionType) {
	switch (action.type) {
		case LOGIN_REQUEST_STARTED:
			return true;
		case LOGIN_REQUEST_ENDED:
			return false;
		default:
			return state;
	}
}

const defaultUploadImagesState = List<boolean>();

export function areUploadImageRequestsStarted(state = defaultUploadImagesState, action: ActionType) {
	switch (action.type) {
		case UPLOAD_IMAGES_REQUEST_RESET:
			return List<boolean>();
		case UPLOAD_IMAGE_REQUEST_START:
			return state.set(action.payload.index, true);
		case UPLOAD_IMAGE_REQUEST_END:
			return state.set(action.payload.index, false);
		default:
			return state;
	}
}
