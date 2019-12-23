import React from 'react';
import { useHistory } from 'react-router-dom';

export default (Component: any) => {
	return () => {
		const history = useHistory();

		const props = {
			...Component.props,
			history,
		};
		return <Component {...props}></Component>;
	};
};
