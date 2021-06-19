import { render as rtlRender } from '@testing-library/react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { ThemeProvider } from 'styled-components';

import PageContext from '~/context';
import rootReducer from '~/store/reducers';
import { theme } from '~/theme/mainTheme';

import type { RenderOptions as RtlRenderOptions } from '@testing-library/react';
import type { Store } from 'redux';

import type { ItemVariants } from '~/commonTypes';

type RenderOptions = {
  path?: string;
  pageType?: ItemVariants;
  store?: Store;
} & RtlRenderOptions;

export const render = (
  ui: React.ReactElement,
  {
    path = '/',
    pageType = 'notes',
    store = createStore(rootReducer, applyMiddleware(thunk)),
    ...renderOptions
  }: RenderOptions = {},
) => {
  window.history.pushState({}, 'Test page', path);

  const Wrapper: React.FC = ({ children }): React.ReactElement => (
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
