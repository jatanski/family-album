import React, { useState } from 'react';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';

const Wrap = (history: any) => {
  const [showSignUp, setShowSignUp] = useState(false);

  const toggleForm = () => setShowSignUp(!showSignUp);

  return showSignUp ? (
    <SignUp history={history} toggleForm={toggleForm}></SignUp>
  ) : (
    <Login history={history} toggleForm={toggleForm}></Login>
  );
};

export default Wrap;
