import ReactDOM from 'react-dom';
import { ReactNode } from 'react';

const portalRoot: any = document.getElementById('portal');

type Props = {
  children: ReactNode;
};

const Portal = ({ children }: Props) => ReactDOM.createPortal(children, portalRoot);

export default Portal;
