import React, { FC } from 'react';
import { Switch, HashRouter, useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';
import SignInAndSignUp from './SignInAndSignUp';
import LandingPage from './LandingPage';
import Albums from './Albums';
import AddPhoto from './AddPhoto';
import WatchPhotos from './WatchPhotos';
import Miniatures from './Miniatures';
import Carousel from './Carousel';
import { useSelector } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';
import { AppState } from '../redux/reducers';
import RouteWithRedirect from '../components/RouteWithRedirect';
import BaseModel from '../utils/baseModel';

const Root: FC = function Root() {
	const isLogged = useSelector((state: AppState) => !!state.token);

	const token = BaseModel.getAuthToken();
	return (
		<ToastProvider>
			<HashRouter>
				{token && <Navigation />}
				<Switch>
					<RouteWithRedirect exact path="/" redirect={isLogged} redirectPath="/photos">
						<LandingPage />
					</RouteWithRedirect>
					<RouteWithRedirect path="/login" redirect={isLogged} redirectPath="/photos">
						<SignInAndSignUp />
					</RouteWithRedirect>
					<RouteWithRedirect path="/albums" redirect={!isLogged} redirectPath="/login">
						<Albums />
					</RouteWithRedirect>
					<RouteWithRedirect path="/add" redirect={!isLogged} redirectPath="/login">
						<AddPhoto />
					</RouteWithRedirect>
					<RouteWithRedirect path="/photos" redirect={!isLogged} redirectPath="/login">
						<WatchPhotos />{' '}
					</RouteWithRedirect>
					<RouteWithRedirect path="/miniatures" redirect={!isLogged} redirectPath="/login">
						<Miniatures />
					</RouteWithRedirect>
					<RouteWithRedirect path="/carousel" redirect={!isLogged} redirectPath="/login">
						<Carousel />
					</RouteWithRedirect>
				</Switch>
			</HashRouter>
		</ToastProvider>
	);
};

export default Root;
