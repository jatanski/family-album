import React, { FC } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';

const LoginFormContainer: FC = ({ children }) => (
	<div className="loginForm">
		<MDBContainer>
			<MDBRow>
				<MDBCol>{children}</MDBCol>
			</MDBRow>
		</MDBContainer>
	</div>
);

export default LoginFormContainer;
