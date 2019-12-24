import React, { FC, useCallback } from 'react';
import { MDBNavbarNav, MDBNavItem, MDBNavLink, MDBIcon } from 'mdbreact';
import { ActiveWrapper } from './Navigation.menu';
import { deleteToken } from '../../../redux/token/token';
import { useDispatch } from 'react-redux';

export interface MenuViewProps {
	activeWrapper: ActiveWrapper;
}

const MenuView: FC<MenuViewProps> = function MenuView({ activeWrapper }) {
	const dispatch = useDispatch();
	const logOutCallback = useCallback(() => {
		dispatch(deleteToken());
	}, []);
	return (
		<MDBNavbarNav className="navBar" left>
			<MDBNavItem active={activeWrapper.addPhotoActive}>
				<MDBNavLink className="customNavColor" to="/add">
					Dodaj zdjęcia
				</MDBNavLink>
			</MDBNavItem>
			<MDBNavItem active={activeWrapper.albumsActive}>
				<MDBNavLink className="customNavColor" to="/albums">
					Twoje albumy
				</MDBNavLink>
			</MDBNavItem>
			<MDBNavItem active={activeWrapper.watchPhotosActive}>
				<MDBNavLink className="customNavColor" to="/photos">
					Przeglądaj zdjęcia
				</MDBNavLink>
			</MDBNavItem>
			<div className="logoutWrapper" onClick={logOutCallback}>
				<MDBIcon className="logoutIcon" icon="sign-out-alt" />
				<span className="logoutText">Wyloguj</span>
			</div>
		</MDBNavbarNav>
	);
};

export default MenuView;
