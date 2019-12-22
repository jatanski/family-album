import { ActionType, LOGIN_REQUEST_STARTED, LOGIN_REQUEST_ENDED } from './types';

const defaultState = false;

export function isLoginRequestStarted(state: boolean = defaultState, action: ActionType) {
	switch (action.type) {
		case LOGIN_REQUEST_STARTED:
			return true;
		case LOGIN_REQUEST_ENDED:
			return false;
		default:
			return state;
	}
}
