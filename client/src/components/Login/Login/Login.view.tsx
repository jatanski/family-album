import React, { FC } from 'react';
import { LoginViewProps } from './Login.types';
import './login.scss';
import LoginFormContainer from './utils/Login.formContainer';
import LoginForm from './utils/Login.loginForm';

const View: FC<LoginViewProps> = props => (
	<LoginFormContainer>
		<LoginForm {...props} />
	</LoginFormContainer>
);

export default View;
