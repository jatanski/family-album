import React, { FC } from 'react';
import { MDBNavbarBrand } from 'mdbreact';
import Logo from '../Logo/Logo';

const NavBarBrand: FC = () => (
	<MDBNavbarBrand href="/">
		<Logo className="customNavColor" />
	</MDBNavbarBrand>
);

export default NavBarBrand;
