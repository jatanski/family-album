import React, { FormEvent, useState, SyntheticEvent } from 'react';
import View from './View';
import { Props } from './types';
import BaseModel from '../../../utils/baseModel';
import { useHistory } from 'react-router-dom';

const Login = ({ toggleForm }: Props) => {
  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  let history = useHistory();

  const endpoint = 'login';

  const handleEmailInputChange = (e: FormEvent<HTMLInputElement>) => setLoginValue(e.currentTarget.value);
  const handlePasswordInputChange = (e: FormEvent<HTMLInputElement>) => setPasswordValue(e.currentTarget.value);

  const submitLogin = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

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

      const token = response.headers.get('x-auth-token');

      if (token) BaseModel.saveAuthToken(token);

      history.push('/dashboard');
      console.log('Loguje...');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View
      toggleForm={toggleForm}
      handleEmailInput={handleEmailInputChange}
      handlePasswordInput={handlePasswordInputChange}
      submitLogin={submitLogin}
    ></View>
  );
};

export default Login;
