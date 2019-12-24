import {
	LOGIN_REQUEST_STARTED,
	LOGIN_REQUEST_ENDED,
	LoginRequestEndedAction,
	LoginRequestStartedAction,
	UploadImagesRequestResetAction,
	UPLOAD_IMAGES_REQUEST_RESET,
	UploadImageRequestStartAction,
	UPLOAD_IMAGE_REQUEST_START,
	UploadImageRequestEndAction,
	UPLOAD_IMAGE_REQUEST_END,
	ShowUploadImagesSuccess,
	SHOW_UPLOAD_IMAGES_SUCCESS,
	HIDE_UPLOAD_IMAGES_SUCCESS,
	HideUploadImagesSuccess,
	ActionType,
} from './types';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../reducers';

function startLoginRequest(): LoginRequestStartedAction {
	return {
		type: LOGIN_REQUEST_STARTED,
	};
}

function endLoginRequest(): LoginRequestEndedAction {
	return {
		type: LOGIN_REQUEST_ENDED,
	};
}

function resetUploadImagesRequest(): UploadImagesRequestResetAction {
	return {
		type: UPLOAD_IMAGES_REQUEST_RESET,
	};
}

function startUploadImageRequest(index: number): UploadImageRequestStartAction {
	return {
		type: UPLOAD_IMAGE_REQUEST_START,
		payload: { index },
	};
}

function endUploadImageRequest(index: number): UploadImageRequestEndAction {
	return {
		type: UPLOAD_IMAGE_REQUEST_END,
		payload: { index },
	};
}

function showUploadImagesSuccess(): ShowUploadImagesSuccess {
	return {
		type: SHOW_UPLOAD_IMAGES_SUCCESS,
	};
}

function hideUploadImagesSuccess(): HideUploadImagesSuccess {
	return {
		type: HIDE_UPLOAD_IMAGES_SUCCESS,
	};
}

function displayUploadImageSuccess(timeInSeconds: number): ThunkAction<Promise<void>, AppState, {}, ActionType> {
	return async dispatch => {
		dispatch(showUploadImagesSuccess());
		await new Promise(res => {
			setTimeout(res, timeInSeconds * 1000);
		});
		dispatch(hideUploadImagesSuccess());
	};
}

export {
	startLoginRequest,
	endLoginRequest,
	resetUploadImagesRequest,
	startUploadImageRequest,
	endUploadImageRequest,
	displayUploadImageSuccess,
};
