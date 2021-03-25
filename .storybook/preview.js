import { ThemeProvider } from 'styled-components';
import { theme } from '../src/theme/mainTheme';
import PageContext from '../src/context';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  ),
  (Story, { parameters: { pageContext } }) => (
    <PageContext.Provider value={pageContext}>
      <Story />
    </PageContext.Provider>
  ),
];
