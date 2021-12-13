import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../src/theme/mainTheme';
import { CurrentPageVariantContext } from '../src/context/currentPageVariant';
import { Provider } from 'react-redux';
import StoryRouter from 'storybook-react-router';
import { itemsPageLinks, cardListTemplateLinks, userPageTemplateLinks } from './links';
import GlobalStyle from '../src/theme/GlobalStyle';
import CardList from '../src/components/organisms/CardList/CardList';
import AuthTemplate from '../src/templates/AuthTemplate/AuthTemplate';
import { storybookStore } from './storybookStore';

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

export const PageVariantDecorator = (Story, { parameters: { pageVariant } }) => (
  <CurrentPageVariantContext.Provider value={{ currentPageVariant: pageVariant }}>
    <Story />
  </CurrentPageVariantContext.Provider>
);

export const StoreDecorator = (Story, args) => (
  <Provider {...args} store={storybookStore(args.parameters.state)}>
    <Story />
  </Provider>
);

const CardWrapper = styled.div`
  max-width: 45.5rem;
`;

export const CardWrapperDecorator = (Story) => (
  <CardWrapper>
    <Story style={{ zIndex: 2 }} />
  </CardWrapper>
);

const StyledSkeletonWrapper = styled.div`
  padding: 0 1rem;
  border: 2px dashed hsl(0, 0%, 60%);
`;

const StyledInfoText = styled.p`
  display: block;
  text-align: center;
  font-style: italic;
  font-size: 1.4rem;
`;

export const SkeletonWrapperDecorator = (Story) => (
  <>
    <StyledSkeletonWrapper>
      <Story />
    </StyledSkeletonWrapper>
    <StyledInfoText>
      For presentation purpose, the Skeleton component is in wrapper element with dashed border and
      1rem horizontal padding!
    </StyledInfoText>
  </>
);

const StyledSkeletonGridWrapper = styled(CardList.Grid)`
  padding: 1rem;
  border: 2px dashed hsl(0, 0%, 60%);
`;

export const SkeletonCardListGridDecorator = (Story) => (
  <>
    <StyledInfoText>
      For presentation purpose, the SkeletonCartList component is in wrapper element with dashed
      border, 1rem padding and in the css grid from GridTemplate!
    </StyledInfoText>
    <StyledSkeletonGridWrapper>
      <Story />
    </StyledSkeletonGridWrapper>
  </>
);

export const CardListGridDecorator = (Story) => (
  <>
    <StyledInfoText>
      For presentation purpose, the CartList component is in wrapper element with dashed border,
      1rem padding and in the css grid from GridTemplate!
    </StyledInfoText>
    <StyledSkeletonGridWrapper>
      <Story />
    </StyledSkeletonGridWrapper>
  </>
);

const StyledAuthFormBoxCard = styled(AuthTemplate.AuthCard)`
  box-shadow: none;
  border: 2px dashed hsl(0, 0%, 60%);
`;

export const AuthFormBoxCardDecorator = (Story) => (
  <>
    <StyledInfoText>
      For presentation purpose, the AuthFormBox component is in wrapper element with dashed border
      in the styled component from AuthTemplate!
    </StyledInfoText>
    <StyledAuthFormBoxCard>
      <Story />
    </StyledAuthFormBoxCard>
  </>
);

export const DetailsPageRouterDecorator = (detailsPagePathname) => {
  /**
   * Hard code sample note id from 'store/__mocks__'
   */
  const ITEM_ID = '8885d2d6-b081-4342-8232-e889affa9d93';
  const detailsPagePath = detailsPagePathname.replace(':id', ITEM_ID);

  return StoryRouter(itemsPageLinks, { initialEntries: [detailsPagePath] });
};

export const CardListTemplateRouterDecorator = (currentPathname) => {
  return StoryRouter(cardListTemplateLinks, { initialEntries: [currentPathname] });
};

export const UserPageTemplateRouterDecorator = (currentPathname) => {
  return StoryRouter(userPageTemplateLinks, { initialEntries: [currentPathname] });
};
