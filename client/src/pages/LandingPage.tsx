import React, { FC } from 'react';
import { Link } from 'react-router-dom';
const LandingPage: FC = () => (
	<section className="landingpage">
		<Link to="/login">Zaloguj</Link>;
	</section>
);

export default LandingPage;
