import React, { FC } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';
import SignInAndSignUp from './SignInAndSignUp';
import Dashboard from './Dashboard';
import LandingPage from './LandingPage';
import Albums from './Albums';
import AddPhoto from './AddPhoto';

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
          <Route path="/add" component={AddPhoto}></Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Root;
