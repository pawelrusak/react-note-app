import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../src/theme/mainTheme';
import PageContext from '../src/context';
import { Provider } from 'react-redux';
import store from '../src/store';
import StoryRouter from 'storybook-react-router';
import { itemsPageLinks, gridTemplateLinks, userPageTemplateLinks } from './links';
import GlobalStyle from '../src/theme/GlobalStyle';

const CardWrapper = styled.div`
  max-width: 45.5rem;
`;

export const ThemeDecorator = (Story) => (
  <ThemeProvider theme={theme}>
    <Story />
  </ThemeProvider>
);

export const GlobalStyleDecorator = (Story) => (
  <>
    <GlobalStyle />
    <Story />
  </>
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

export const DetailsPageRouterDecorator = (detailsPagePathname) => {
  /**
   * Hard code sample note id from 'store/__mocks__'
   */
  const ITEM_ID = '8885d2d6-b081-4342-8232-e889affa9d93';
  const detailsPagePath = detailsPagePathname.replace(':id', ITEM_ID);

  return StoryRouter(itemsPageLinks, { initialEntries: [detailsPagePath] });
};

export const GridTemplateRouterDecorator = (currentPathname) => {
  return StoryRouter(gridTemplateLinks, { initialEntries: [currentPathname] });
};

export const UserPageTemplateRouterDecorator = (currentPathname) => {
  return StoryRouter(userPageTemplateLinks, { initialEntries: [currentPathname] });
};
