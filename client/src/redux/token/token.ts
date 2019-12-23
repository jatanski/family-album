const SET_TOKEN = 'SET_TOKEN';

interface SetTokenAction {
	type: typeof SET_TOKEN;
	payload: {
		value: string;
	};
}

export function setToken(token: string): SetTokenAction {
	return {
		type: SET_TOKEN,
		payload: {
			value: token,
		},
	};
}

const defaultState = localStorage.getItem('token') ?? '';
export function token(state = defaultState, action: SetTokenAction) {
	switch (action.type) {
		case SET_TOKEN:
			return action.payload.value;
		default:
			return state;
	}
}
