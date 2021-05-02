import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import PageContext from 'context';
import { ThemeProvider } from 'styled-components';
import { theme } from 'theme/mainTheme';
import { render as rtlRender } from '@testing-library/react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'reducers';

export const render = (
  ui,
  {
    path = '/',
    pageType = 'notes',
    store = createStore(rootReducer, applyMiddleware(thunk)),
    ...renderOptions
  } = {},
) => {
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
