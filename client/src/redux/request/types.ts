export const LOGIN_REQUEST_STARTED = 'LOGIN_REQUEST_STARTED';
export const LOGIN_REQUEST_ENDED = 'LOGIN_REQUEST_ENDED';
export const UPLOAD_IMAGES_REQUEST_RESET = 'UPLOAD_IMAGES_REQUEST_RESET';
export const UPLOAD_IMAGE_REQUEST_START = 'UPLOAD_IMAGE_REQUEST_START';
export const UPLOAD_IMAGE_REQUEST_END = 'UPLOAD_IMAGE_REQUEST_END';

export interface LoginRequestStartedAction {
	type: typeof LOGIN_REQUEST_STARTED;
}

export interface LoginRequestEndedAction {
	type: typeof LOGIN_REQUEST_ENDED;
}

export interface UploadImagesRequestResetAction {
	type: typeof UPLOAD_IMAGES_REQUEST_RESET;
}

export interface UploadImageRequestStartAction {
	type: typeof UPLOAD_IMAGE_REQUEST_START;
	payload: {
		index: number;
	};
}

export interface UploadImageRequestEndAction {
	type: typeof UPLOAD_IMAGE_REQUEST_END;
	payload: {
		index: number;
	};
}

export type ActionType =
	| LoginRequestStartedAction
	| LoginRequestEndedAction
	| UploadImagesRequestResetAction
	| UploadImageRequestEndAction
	| UploadImageRequestStartAction;
