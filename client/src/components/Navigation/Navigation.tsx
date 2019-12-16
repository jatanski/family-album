import React, { useState, FC } from 'react';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBNavLink,
} from 'mdbreact';

const Navigation: FC = () => {
  const [collapse, setCollapse] = useState(false);

  const toggleCollapse = () => setCollapse(!collapse);

  return (
    <MDBNavbar className="flexible-navbar" light expand="md" scrolling>
      <MDBNavbarBrand href="/">
        <strong>Prezent od psa</strong>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={toggleCollapse} />
      <MDBCollapse isOpen={collapse} navbar>
        <MDBNavbarNav left>
          <MDBNavItem active>
            <MDBNavLink to="#">Home</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/add">Dodaj zdjęcia</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/albums">Twoje albumy</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/photos">Przeglądaj zdjęcia</MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
  );
};

export default Navigation;
