import { FormEvent, SyntheticEvent } from 'react';

export type Props = {
  loginValue?: string;
  passwordValue?: string;
  toggleForm: () => void;
  submitLogin?: (e: SyntheticEvent<HTMLButtonElement>) => void;
  handleEmailInput?: (e: FormEvent<HTMLInputElement>) => void;
  handlePasswordInput?: (e: FormEvent<HTMLInputElement>) => void;
};
