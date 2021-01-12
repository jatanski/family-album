import React, { useState, FormEvent, SyntheticEvent, FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Props } from './types';
import BaseModel from '../../../utils/baseModel';
import View from './View';

const SignUp: FC<Props> = ({ toggleForm }) => {
	const [loginValue, setLoginValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');
	const [repeatPasswordValue, setRepeatPasswordValue] = useState('');
	const [invalidPassword, setInvalidPassword] = useState(false);

	const history = useHistory();

	const endpoint: string = 'register';

	const handleEmailInputChange = (e: FormEvent<HTMLInputElement>): void => setLoginValue(e.currentTarget.value);
	const handlePasswordInputChange = (e: FormEvent<HTMLInputElement>): void => setPasswordValue(e.currentTarget.value);
	const handleRepeatPasswordInputChange = (e: FormEvent<HTMLInputElement>): void =>
		setRepeatPasswordValue(e.currentTarget.value);

	const validPassword = (): boolean => {
		if (repeatPasswordValue !== passwordValue) {
			setInvalidPassword(true);
			return false;
		} else {
			setInvalidPassword(false);
			return true;
		}
	};

	const submitRegister = async (e: SyntheticEvent<HTMLButtonElement>): Promise<void> => {
		e.preventDefault();

		const passwordIsValid = validPassword();

		if (!passwordIsValid) return;

		try {
			const registerData = {
				email: loginValue,
				password: passwordValue,
			};

			const response = await fetch(BaseModel.baseApiUrl + endpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(registerData),
			});

			const token = response.headers.get('x-auth-token');
			if (token) BaseModel.saveAuthToken(token);

			history.push('/dashboard');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<View
			toggleForm={toggleForm}
			handleEmailInput={handleEmailInputChange}
			handlePasswordInput={handlePasswordInputChange}
			handleRepeatPasswordInput={handleRepeatPasswordInputChange}
			invalidPassword={invalidPassword}
			submitRegister={submitRegister}
		></View>
	);
};

export default SignUp;
