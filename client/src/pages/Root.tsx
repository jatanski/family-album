import React, { FC } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';
import SignInAndSignUp from './SignInAndSignUp';
import Dashboard from './Dashboard';
import LandingPage from './LandingPage';
import Albums from './Albums';
import AddPhoto from './AddPhoto';
import WatchPhotos from './WatchPhotos';
import Miniatures from './Miniatures';
import Carousel from './Carousel';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

const Root: FC = () => (
	<Provider store={store}>
		<BrowserRouter>
			<Navigation />
			<Switch>
				<Route exact path="/" component={LandingPage} />
				<Route path="/login" component={SignInAndSignUp} />
				<Route path="/dashboard" component={Dashboard} />
				<Route path="/albums" component={Albums} />
				<Route path="/add" component={AddPhoto} />
				<Route path="/photos" component={WatchPhotos} />
				<Route path="/miniatures" component={Miniatures} />
				<Route path="/carousel" component={Carousel} />
			</Switch>
		</BrowserRouter>
	</Provider>
);

export default Root;
