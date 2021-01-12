import React from 'react';
import { AlbumFormProps } from '../../AddPhoto.types';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
const AlbumForm = ({ children, submitForm }: AlbumFormProps) => (
	<MDBContainer>
		<MDBRow>
			<MDBCol>
				<form className="addPhoto__wrapper--form" action="submit">
					{children}
					<div className="addPhoto__wrapper--addButtonWrap">
						<MDBBtn
							className="addPhoto__wrapper--addButton buttonSecondary"
							onClick={submitForm}
							type="submit"
							color="info"
						>
							Zapisz zdjęcia
						</MDBBtn>
					</div>
				</form>
			</MDBCol>
		</MDBRow>
	</MDBContainer>
);

export default AlbumForm;
