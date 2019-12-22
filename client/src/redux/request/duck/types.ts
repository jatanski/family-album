export const LOGIN_REQUEST_STARTED = 'LOGIN_REQUEST_STARTED';
export const LOGIN_REQUEST_ENDED = 'LOGIN_REQUEST_ENDED';

export interface LoginRequestStartedAction {
	type: typeof LOGIN_REQUEST_STARTED;
}

export interface LoginRequestEndedAction {
	type: typeof LOGIN_REQUEST_ENDED;
}

export type ActionType = LoginRequestStartedAction | LoginRequestEndedAction;
