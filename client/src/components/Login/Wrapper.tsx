import React, { useState, FC } from 'react';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import './wrapper.scss';

const Wrap: FC = () => {
	const [showSignUp, setShowSignUp] = useState(false);

	const toggleForm = (): void => setShowSignUp(!showSignUp);

	return showSignUp ? <SignUp toggleForm={toggleForm}></SignUp> : <Login toggleForm={toggleForm}></Login>;
};

export default Wrap;
