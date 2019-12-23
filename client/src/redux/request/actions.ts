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
} from './types';

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

export { startLoginRequest, endLoginRequest, resetUploadImagesRequest, startUploadImageRequest, endUploadImageRequest };
