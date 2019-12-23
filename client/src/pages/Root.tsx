import React, { FC } from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';
import SignInAndSignUp from './SignInAndSignUp';
import LandingPage from './LandingPage';
import Albums from './Albums';
import AddPhoto from './AddPhoto';
import WatchPhotos from './WatchPhotos';
import Miniatures from './Miniatures';
import Carousel from './Carousel';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { ToastProvider } from 'react-toast-notifications';

const Root: FC = () => (
	<Provider store={store}>
		<ToastProvider>
			<HashRouter>
				<Navigation />
				<Switch>
					<Route exact path="/" component={LandingPage} />
					<Route path="/login" component={SignInAndSignUp} />
					<Route path="/albums" component={Albums} />
					<Route path="/add" component={AddPhoto} />
					<Route path="/photos" component={WatchPhotos} />
					<Route path="/miniatures" component={Miniatures} />
					<Route path="/carousel" component={Carousel} />
				</Switch>
			</HashRouter>
		</ToastProvider>
	</Provider>
);

export default Root;
