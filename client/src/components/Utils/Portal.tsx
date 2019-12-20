import ReactDOM from 'react-dom';
import { ReactNode } from 'react';

type PortalProps = {
  children: ReactNode;
};

const portalRoot: any = document.getElementById('portal');

const Portal = ({ children }: PortalProps) => ReactDOM.createPortal(children, portalRoot);

export default Portal;
