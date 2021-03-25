import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../src/theme/mainTheme';
import PageContext from '../src/context';
import { Provider } from 'react-redux';
import store from 'store';

const CardWrapper = styled.div`
  max-width: 45.5rem;
`;

export const ThemeDecorator = (Story) => (
  <ThemeProvider theme={theme}>
    <Story />
  </ThemeProvider>
);

export const PageContextDecorator = (Story, { parameters: { pageContext } }) => (
  <PageContext.Provider value={pageContext}>
    <Story />
  </PageContext.Provider>
);

export const StoreDecorator = (Story, args) => (
  <Provider {...args} store={store}>
    <Story />
  </Provider>
);

export const CardWrapperDecorator = (Story) => (
  <CardWrapper>
    <Story style={{ zIndex: 2 }} />
  </CardWrapper>
);
