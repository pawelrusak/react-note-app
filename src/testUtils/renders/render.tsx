import { configureStore, AppStore } from '@reduxjs/toolkit';
import { render as rtlRender } from '@testing-library/react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { CurrentPageVariantProvider } from '~/context';
import rootReducer from '~/store/reducers';
import { theme } from '~/theme/mainTheme';

import type { RenderOptions as RtlRenderOptions } from '@testing-library/react';
import type { RootState } from '~/store';

type RenderOptions = {
  path?: string;
  store?: AppStore;
  initialState?: RootState | null;
} & RtlRenderOptions;

export const render = (
  ui: React.ReactElement,
  {
    path = '/',
    initialState,
    store = initialState === null || initialState === undefined
      ? configureStore({ reducer: rootReducer })
      : configureStore({ reducer: rootReducer, preloadedState: initialState }),
    ...renderOptions
  }: RenderOptions = {},
) => {
  window.history.pushState({}, 'Test page', path);

  const Wrapper: React.FC = ({ children }): React.ReactElement => (
    <BrowserRouter>
      <Provider store={store}>
        <CurrentPageVariantProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </CurrentPageVariantProvider>
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
