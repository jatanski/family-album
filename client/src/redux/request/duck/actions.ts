import {
	LOGIN_REQUEST_STARTED,
	LOGIN_REQUEST_ENDED,
	LoginRequestEndedAction,
	LoginRequestStartedAction,
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

export { startLoginRequest, endLoginRequest };
