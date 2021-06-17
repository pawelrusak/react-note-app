import { render as rtlRender } from '@testing-library/react';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';

import type { RenderOptions as RtlRenderOptions } from '@testing-library/react';

type RenderOptions = { path?: string } & RtlRenderOptions;

export const renderWithRouter = (
  ui: React.ReactElement,
  { path = '/', ...renderOptions }: RenderOptions = {},
) => {
  window.history.pushState({}, 'Test page', path);

  const Wrapper: React.FC = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;

  Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return rtlRender(ui, {
    wrapper: Wrapper,
    ...renderOptions,
  });
};
