import React, { useState, FC, useEffect } from 'react';
import { MDBNavbar, MDBNavbarToggler, MDBCollapse } from 'mdbreact';
import Portal from '../Utils/Portal';
import Menu from './Navigatgion.menu';
import NavBarBrand from './Navigation.navBarBrand';
import Dashboard from '../Dashboard/AddPhoto/AddPhoto';
import BaseModel from '../../utils/baseModel';

const Navigation: FC = () => {
  const [collapse, setCollapse] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);

  useEffect(() => {
    const token = BaseModel.getAuthToken();
    if (token) setShowNavigation(true);
    else setShowNavigation(false);
  });

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
