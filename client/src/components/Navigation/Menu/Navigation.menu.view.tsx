import React, { FC, useState, useEffect } from 'react';
import { MDBNavbarNav, MDBNavItem, MDBNavLink } from 'mdbreact';
import { useHistory } from 'react-router-dom';
import { ActiveWrapper } from './Navigation.menu';

export interface MenuViewProps {
	activeWrapper: ActiveWrapper;
}

const MenuView: FC<MenuViewProps> = ({ activeWrapper }) => {
	return (
		<MDBNavbarNav left>
			<MDBNavItem active={activeWrapper.addPhotoActive}>
				<MDBNavLink to="/add">Dodaj zdjęcia</MDBNavLink>
			</MDBNavItem>
			<MDBNavItem active={activeWrapper.albumsActive}>
				<MDBNavLink to="/albums">Twoje albumy</MDBNavLink>
			</MDBNavItem>
			<MDBNavItem active={activeWrapper.watchPhotosActive}>
				<MDBNavLink to="/photos">Przeglądaj zdjęcia</MDBNavLink>
			</MDBNavItem>
		</MDBNavbarNav>
	);
};

export default MenuView;
