import React, { FC } from 'react';
import { MDBNavbarNav, MDBNavItem, MDBNavLink } from 'mdbreact';

const Menu: FC = () => {
  return (
    <MDBNavbarNav left>
      <MDBNavItem active>
        <MDBNavLink to="/dashboard">Pulpit</MDBNavLink>
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
  );
};

export default Menu;
