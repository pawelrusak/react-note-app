import { ThemeProvider } from 'styled-components';
import { theme } from '../src/theme/mainTheme';
import PageContext from '../src/context';

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
