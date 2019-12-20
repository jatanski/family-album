import React, { FC } from 'react';
import { LoginViewProps } from './types';
import './login.scss';
import LoginFormContainer from './utils/LoginFormContainer';
import LoginForm from './utils/LoginForm';

const View: FC<LoginViewProps> = props => (
  <LoginFormContainer>
    <LoginForm {...props} />
  </LoginFormContainer>
);

export default View;
