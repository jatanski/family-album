import React, { FC, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import View from './Navigation.menu.view';

export interface ActiveWrapper {
	dashboardActive?: boolean;
	addPhotoActive?: boolean;
	albumsActive?: boolean;
	watchPhotosActive?: boolean;
}

const Menu: FC = () => {
	const startedActiveWrapper = {
		dashboardActive: false,
		addPhotoActive: false,
		albumsActive: false,
		watchPhotosActive: false,
	};

	const [activeWrapper, setActiveWrapper] = useState<ActiveWrapper>({ ...startedActiveWrapper });

	const pathNames = {
		dashboard: '/dashboard',
		addPhoto: '/add',
		albums: '/albums',
		watchPhotos: '/photos',
	};

	const history = useHistory();

	useEffect(() => {
		setActiveWrapperUseHistory();
	}, [history.location.pathname]);

	const setActiveWrapperUseHistory = () => {
		const pathname = history.location.pathname;
		setActiveWrapper({ ...startedActiveWrapper });
		switch (pathname) {
			case pathNames.albums:
				setActiveWrapper({
					albumsActive: true,
				});
				break;
			case pathNames.addPhoto:
				setActiveWrapper({
					addPhotoActive: true,
				});
				break;
			case pathNames.watchPhotos:
				setActiveWrapper({
					watchPhotosActive: true,
				});
				break;
		}
	};
	return <View activeWrapper={activeWrapper} />;
};

export default Menu;
