import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import '../scss/pages/landingPage.scss';
import { MDBBtn } from 'mdbreact';
const LandingPage: FC = () => (
	<section className="landing-page">
		<div className="landing-page__btnWrap">
			<Link to="/login">
				<MDBBtn className="buttonPrimary">Zaloguj</MDBBtn>
			</Link>
		</div>
	</section>
);

export default LandingPage;
