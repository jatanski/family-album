import React, { FormEvent, useState, SyntheticEvent, FC } from 'react';
import { useHistory } from 'react-router-dom';
import { LoginViewProps } from './Login.types';
import BaseModel from '../../../utils/baseModel';
import View from './Login.view';
import { useDispatch } from 'react-redux';
import { startLoginRequest, endLoginRequest } from '../../../redux/request/duck/actions';

const Login: FC<LoginViewProps> = ({ toggleForm }) => {
	const [loginValue, setLoginValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');

	const history = useHistory();
	const dispatch = useDispatch();

	const endpoint: string = 'login';

	const handleEmailInputChange = (e: FormEvent<HTMLInputElement>): void => setLoginValue(e.currentTarget.value);
	const handlePasswordInputChange = (e: FormEvent<HTMLInputElement>): void => setPasswordValue(e.currentTarget.value);

	const submitLogin = async (e: SyntheticEvent<HTMLButtonElement>): Promise<void> => {
		e.preventDefault();
		dispatch(startLoginRequest());
		try {
			const loginData = {
				email: loginValue,
				password: passwordValue,
			};

			const response = await fetch(BaseModel.baseApiUrl + endpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(loginData),
			});

			if (response.ok) {
				const token = response.headers.get('x-token');
				if (token) BaseModel.saveAuthToken(token);

				history.push('/dashboard');
			} else {
				setLoginValue('');
				setPasswordValue('');
				alert('Niepoprawny email lub hasło.');
			}
		} catch (error) {
			console.error(error);
		} finally {
			dispatch(endLoginRequest());
		}
	};

	return (
		<View
			loginValue={loginValue}
			passwordValue={passwordValue}
			toggleForm={toggleForm}
			handleEmailInput={handleEmailInputChange}
			handlePasswordInput={handlePasswordInputChange}
			submitLogin={submitLogin}
		></View>
	);
};

export default Login;
