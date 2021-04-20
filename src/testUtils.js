import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from 'store';
import PropTypes from 'prop-types';
import PageContext from 'context';
import { ThemeProvider } from 'styled-components';
import { theme } from 'theme/mainTheme';

const render = (ui, { path = '/', pageType = 'notes', ...renderOptions } = {}) => {
  window.history.pushState({}, 'Test page', path);

  const Wrapper = ({ children }) => (
    <BrowserRouter>
      <Provider store={store}>
        <PageContext.Provider value={pageType}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </PageContext.Provider>
      </Provider>
    </BrowserRouter>
  );

  Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return {
    ...rtlRender(ui, {
      wrapper: Wrapper,
      ...renderOptions,
    }),
    store,
  };
};

export { default as userEvent } from '@testing-library/user-event';
export * from '@testing-library/react';
export { render, rtlRender };
