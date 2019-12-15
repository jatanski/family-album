import { FormEvent, SyntheticEvent } from 'react';

export type Props = {
  history?: any;
  toggleForm: () => void;
  submitLogin?: (e: SyntheticEvent<HTMLButtonElement>) => void;
  handleEmailInput?: (e: FormEvent<HTMLInputElement>) => void;
  handlePasswordInput?: (e: FormEvent<HTMLInputElement>) => void;
};
