import React, { FC } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';

interface RouteWithRedirectProps extends RouteProps {
	redirect: boolean;
	redirectPath: string;
}

const RouteWithRedirect: FC<RouteWithRedirectProps> = function RouteWithRedirect(props) {
	const { redirect, redirectPath, children, ...routeProps } = props;
	return <Route {...routeProps}>{redirect ? <Redirect to={redirectPath} /> : children} </Route>;
};

export default RouteWithRedirect;
