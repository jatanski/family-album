import React, { FC } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import SignInAndSignUp from './SignInAndSignUp';
import Dashboard from './Dashboard';
import LandingPage from './LandingPage';
import Albums from './Albums';
import Navigation from '../components/Navigation/Navigation';

const Root: FC = () => {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route exact path="/" component={LandingPage}></Route>
          <Route path="/login" component={SignInAndSignUp}></Route>
          <Route path="/dashboard" component={Dashboard}></Route>
          <Route path="/albums" component={Albums}></Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Root;
