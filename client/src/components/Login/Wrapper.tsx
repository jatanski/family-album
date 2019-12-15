import React, { useState } from 'react';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';

const Wrap = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  const toggleForm = () => setShowSignUp(!showSignUp);

  return showSignUp ? <SignUp toggleForm={toggleForm}></SignUp> : <Login toggleForm={toggleForm}></Login>;
};

export default Wrap;
