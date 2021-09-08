import ReactDOM from 'react-dom';

import { useEffectOnce } from '~/hooks';

type PortalProps = {
  children: React.ReactNode;
};

const Portal = ({ children }: PortalProps) => {
  const modalRoot = document.getElementById('portal-root') as HTMLElement;
  const element = document.createElement('div');

  useEffectOnce(() => {
    modalRoot.appendChild(element);

    return () => {
      modalRoot.removeChild(element);
    };
  });

  return ReactDOM.createPortal(children, element);
};

export default Portal;
