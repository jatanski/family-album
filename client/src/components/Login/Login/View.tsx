import React, { FC } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { Props } from './types';
import './login.scss';

const View: FC<Props> = ({
  toggleForm,
  handleEmailInput,
  handlePasswordInput,
  submitLogin,
  loginValue,
  passwordValue,
}) => {
  return (
    <div className="loginForm">
      <MDBContainer>
        <MDBRow>
          <MDBCol>
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
                  value={loginValue}
                />
                <MDBInput
                  onChange={handlePasswordInput}
                  label="Hasło"
                  icon="lock"
                  group
                  type="password"
                  value={passwordValue}
                  validate
                />
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
    </div>
  );
};

export default View;
