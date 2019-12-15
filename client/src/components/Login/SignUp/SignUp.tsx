import React, { useState, FormEvent, SyntheticEvent } from 'react';
import View from './View';
import { Props } from './types';
import BaseModel from '../../../utils/baseModel';

const SignUp = ({ toggleForm, history }: Props) => {
  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [repeatPasswordValue, setRepeatPasswordValue] = useState('');
  const [invalidPassword, setInvalidPassword] = useState(false);

  const endpoint = 'register';

  const handleEmailInputChange = (e: FormEvent<HTMLInputElement>) => setLoginValue(e.currentTarget.value);
  const handlePasswordInputChange = (e: FormEvent<HTMLInputElement>) => setPasswordValue(e.currentTarget.value);
  const handleRepeatPasswordInputChange = (e: FormEvent<HTMLInputElement>) =>
    setRepeatPasswordValue(e.currentTarget.value);

  const validPassword = () => {
    if (repeatPasswordValue !== passwordValue) {
      setInvalidPassword(true);
      return false;
    } else {
      setInvalidPassword(false);
      return true;
    }
  };

  const submitRegister = async (e: SyntheticEvent<HTMLButtonElement>) => {
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

      console.log(history);

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
      history={history}
      invalidPassword={invalidPassword}
      submitRegister={submitRegister}
    ></View>
  );
};

export default SignUp;
