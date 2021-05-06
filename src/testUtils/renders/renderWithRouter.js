import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { render as rtlRender } from '@testing-library/react';

export const renderWithRouter = (ui, { path = '/', ...renderOptions } = {}) => {
  window.history.pushState({}, 'Test page', path);

  const Wrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;

  Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return rtlRender(ui, {
    wrapper: Wrapper,
    ...renderOptions,
  });
};
