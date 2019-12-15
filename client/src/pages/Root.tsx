import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import App from './App';
import SignInAndSignUp from './SignInAndSignUp';
import Dashboard from './Dashboard';

const Root = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App}></Route>
        <Route path="/login" component={SignInAndSignUp}></Route>
        <Route path="/dashboard" component={Dashboard}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Root;
