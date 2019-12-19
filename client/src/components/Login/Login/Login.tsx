import React, { FormEvent, useState, SyntheticEvent, FC } from 'react';
import { useHistory } from 'react-router-dom';
import BaseModel from '../../../utils/baseModel';
import View from './View';
import { Props } from './types';

const Login: FC<Props> = ({ toggleForm }) => {
  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const history = useHistory();

  const endpoint: string = 'login';

  const handleEmailInputChange = (e: FormEvent<HTMLInputElement>): void => setLoginValue(e.currentTarget.value);
  const handlePasswordInputChange = (e: FormEvent<HTMLInputElement>): void => setPasswordValue(e.currentTarget.value);

  const submitLogin = async (e: SyntheticEvent<HTMLButtonElement>): Promise<void> => {
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

      const responseData = await response.json();

      if (response.status === 200) {
        BaseModel.saveAuthToken(responseData.token);
        history.push('/dashboard');
        console.log('Loguje...');
      } else {
        setLoginValue('');
        setPasswordValue('');
        alert('Niepoprawny email lub hasło.');
      }
    } catch (error) {
      console.error(error);
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
