import React, { createContext, ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

export const AlbumContext = createContext('');

export const AlbumContextProvider = ({ children }: Props) => {
	const { Provider } = AlbumContext;

	return <Provider value={''}>{children}</Provider>;
};
