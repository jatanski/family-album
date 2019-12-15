import { FormEvent, SyntheticEvent } from 'react';

export type Props = {
  history?: any;
  invalidPassword?: boolean;
  toggleForm: () => void;
  handleEmailInput?: (e: FormEvent<HTMLInputElement>) => void;
  handlePasswordInput?: (e: FormEvent<HTMLInputElement>) => void;
  handleRepeatPasswordInput?: (e: FormEvent<HTMLInputElement>) => void;
  submitRegister?: (e: SyntheticEvent<HTMLButtonElement>) => void;
};
