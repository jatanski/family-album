import React, { FC } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import SignInAndSignUp from './SignInAndSignUp';
import Dashboard from './Dashboard';
import LandingPage from './LandingPage';

const Root: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage}></Route>
        <Route path="/login" component={SignInAndSignUp}></Route>
        <Route path="/dashboard" component={Dashboard}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Root;
