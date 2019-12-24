import { ThunkAction } from 'redux-thunk';
import { AppState } from '../reducers';

const SET_TOKEN = 'SET_TOKEN';
const DELETE_TOKEN = 'DELETE_TOKEN';

interface SetTokenAction {
	type: typeof SET_TOKEN;
	payload: {
		value: string;
	};
}

interface DeleteTokenAction {
	type: typeof DELETE_TOKEN;
}

type ActionType = SetTokenAction | DeleteTokenAction;

export function setToken(token: string): SetTokenAction {
	return {
		type: SET_TOKEN,
		payload: {
			value: token,
		},
	};
}

export function deleteToken(): ThunkAction<void, AppState, void, ActionType> {
	return dispatch => {
		localStorage.removeItem('token');
		dispatch({
			type: DELETE_TOKEN,
		});
	};
}

const defaultState = localStorage.getItem('token') ?? '';
export function token(state = defaultState, action: ActionType) {
	switch (action.type) {
		case SET_TOKEN:
			return action.payload.value;
		case DELETE_TOKEN:
			return '';
		default:
			return state;
	}
}
