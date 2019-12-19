import React, { useState, FC, useEffect } from 'react';
import { MDBNavbar, MDBNavbarToggler, MDBCollapse } from 'mdbreact';
import Portal from '../Utils/Portal';
import Menu from './Menu';
import NavBarBrand from './NavBarBrand';
import AddPhoto from '../Dashboard/AddPhoto/AddPhoto';
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
          <AddPhoto></AddPhoto>
        </Portal>
      </MDBCollapse>
    </MDBNavbar>
  ) : null;
};

export default Navigation;
