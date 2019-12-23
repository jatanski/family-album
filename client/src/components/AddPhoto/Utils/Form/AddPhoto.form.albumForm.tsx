import React from 'react';
import { AlbumFormProps } from '../../AddPhoto.types';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';

const AlbumForm = ({ children, submitForm }: AlbumFormProps) => (
	<MDBContainer>
		<MDBRow>
			<MDBCol>
				<form action="submit">
					{children}
					<MDBBtn onSubmit={submitForm} type="submit" color="info">
						Wyślij
					</MDBBtn>
				</form>
			</MDBCol>
		</MDBRow>
	</MDBContainer>
);

export default AlbumForm;
