
import React, { useState, FC, useEffect, useCallback } from 'react';
import { MDBNavbar, MDBNavbarToggler, MDBCollapse, MDBIcon } from 'mdbreact';
import Menu from './Menu/Navigation.menu';
import NavBarBrand from './Navigation.navBarBrand';
import { useSelector, useDispatch } from 'react-redux';

import { AppState } from '../../redux/reducers';
import { deleteToken } from '../../redux/token/token';
import Logo from '../Logo/Logo';
import './Navigation.scss';

const Navigation: FC = () => {
	const [collapse, setCollapse] = useState(false);
	const [showNavigation, setShowNavigation] = useState(false);
	const token = useSelector((state: AppState) => state.token);
	const dispatch = useDispatch();

	useEffect(() => {
		if (token != '') setShowNavigation(true);
		else setShowNavigation(false);
	}, [token]);

	const logOutCallback = useCallback(() => {
		dispatch(deleteToken());
	}, []);

	const toggleCollapse = (): void => setCollapse(!collapse);

	return showNavigation ? (
		<MDBNavbar className="flexible-navbar" light expand="md" scrolling>
			<NavBarBrand />
			<MDBNavbarToggler onClick={toggleCollapse} />
			<MDBCollapse isOpen={collapse} navbar>
				<Menu />
			</MDBCollapse>
			<MDBIcon onClick={logOutCallback} icon="sign-out-alt" />
		</MDBNavbar>
	) : (
		<div className="logoWrapper">
			<Logo />
		</div>
	);
};

export default Navigation;
