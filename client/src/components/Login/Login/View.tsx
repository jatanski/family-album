import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { Props } from './types';

const View = ({ toggleForm, handleEmailInput, handlePasswordInput, submitLogin }: Props) => {
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <form>
            <p className="h5 text-center mb-4">Logowanie</p>
            <div className="grey-text">
              <MDBInput
                label="Email"
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                success="right"
                onChange={handleEmailInput}
              />
              <MDBInput onChange={handlePasswordInput} label="Hasło" icon="lock" group type="password" validate />
            </div>
            <div className="text-center">
              <MDBBtn onClick={submitLogin}>Login</MDBBtn>
            </div>
            <div className="text-right">
              <p onClick={toggleForm}>Nie masz konta? Zarejestruj się</p>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default View;
