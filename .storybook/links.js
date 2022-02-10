import { linkTo } from '@storybook/addon-links';
import { ROUTES_PATHS } from '../src/constants';

export const navbarLinks = {
  [ROUTES_PATHS.notes]: linkTo('Organisms/Navbar', 'Note'),
  [ROUTES_PATHS.articles]: linkTo('Organisms/Navbar', 'Article'),
  [ROUTES_PATHS.twitters]: linkTo('Organisms/Navbar', 'Twitter'),
};

export const itemsPageLinks = {
  [ROUTES_PATHS.notes]: linkTo('Views/Notes'),
  [ROUTES_PATHS.articles]: linkTo('Views/Articles'),
  [ROUTES_PATHS.twitters]: linkTo('Views/Twitters'),
  [ROUTES_PATHS.login]: linkTo('Views/LoginPage'),
};

export const authPageLinks = {
  [ROUTES_PATHS.login]: linkTo('Views/LoginPage'),
  [ROUTES_PATHS.register]: linkTo('Views/RegisterPage'),
};

export const cardListTemplateLinks = {
  [ROUTES_PATHS.notes]: linkTo('Templates/CardListTemplate', 'NoteSucceeded'),
  [ROUTES_PATHS.twitters]: linkTo('Templates/CardListTemplate', 'TwitterSucceeded'),
  [ROUTES_PATHS.articles]: linkTo('Templates/CardListTemplate', 'ArticleSucceeded'),
  [ROUTES_PATHS.login]: linkTo('Templates/AuthTemplate'),
};

export const userPageTemplateLinks = {
  [ROUTES_PATHS.notes]: linkTo('Templates/UserPageTemplate', 'Note'),
  [ROUTES_PATHS.twitters]: linkTo('Templates/UserPageTemplate', 'Twitter'),
  [ROUTES_PATHS.articles]: linkTo('Templates/UserPageTemplate', 'Article'),
  [ROUTES_PATHS.login]: linkTo('Templates/AuthTemplate'),
};
