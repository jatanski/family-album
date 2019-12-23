import React, { useState, FC, useEffect } from 'react';
import { MDBNavbar, MDBNavbarToggler, MDBCollapse } from 'mdbreact';
import Portal from '../Utils/Portal';
import Menu from './Menu/Navigation.menu';
import NavBarBrand from './Navigation.navBarBrand';
import Dashboard from '../Dashboard/AddPhoto/AddPhoto';
import BaseModel from '../../utils/baseModel';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';

const Navigation: FC = () => {
	const [collapse, setCollapse] = useState(false);
	const [showNavigation, setShowNavigation] = useState(false);
	const token = useSelector((state: AppState) => state.token);

	useEffect(() => {
		if (token != '') setShowNavigation(true);
		else setShowNavigation(false);
	}, [token]);

	const toggleCollapse = (): void => setCollapse(!collapse);

	return showNavigation ? (
		<MDBNavbar className="flexible-navbar" light expand="md" scrolling>
			<NavBarBrand />
			<MDBNavbarToggler onClick={toggleCollapse} />
			<MDBCollapse isOpen={collapse} navbar>
				<Menu />
				<Portal>
					<Dashboard></Dashboard>
				</Portal>
			</MDBCollapse>
		</MDBNavbar>
	) : null;
};

export default Navigation;
