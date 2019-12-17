import React, { FC } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { Props } from './types';

const View: FC<Props> = ({
  toggleForm,
  handleEmailInput,
  handlePasswordInput,
  handleRepeatPasswordInput,
  invalidPassword,
  submitRegister,
}) => {
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <form>
            <p className="h5 text-center mb-4">Rejestracja</p>
            <div className="grey-text">
              <MDBInput
                onChange={handleEmailInput}
                label="Podaj email"
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                success="right"
              />
              <MDBInput onChange={handlePasswordInput} label="Hasło" icon="lock" group type="password" validate />
              <MDBInput
                onChange={handleRepeatPasswordInput}
                label="Powtórz hasło"
                icon="lock"
                group
                type="password"
                validate
              />
            </div>
            {invalidPassword ? <p>Hasła nie są takie same.</p> : null}
            <div className="text-center">
              <MDBBtn onClick={submitRegister} color="elegant">
                Login
              </MDBBtn>
            </div>
            <div className="text-right">
              <p onClick={toggleForm}>Masz konto? Zaloguj się.</p>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default View;
