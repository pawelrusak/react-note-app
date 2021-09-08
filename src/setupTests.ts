import '@testing-library/jest-dom';
import 'jest-extended';

// eslint-disable-next-line testing-library/no-node-access
let portalRoot = document.getElementById('portal-root');

if (!portalRoot) {
  portalRoot = document.createElement('div');
  portalRoot.id = 'portal-root';
  document.body.appendChild(portalRoot);
}
