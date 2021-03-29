import { linkTo } from '@storybook/addon-links';
import { routes } from '../src/routes';

export const sidebarLinks = {
  [routes.notes]: linkTo('Organisms/Sidebar', 'Note'),
  [routes.articles]: linkTo('Organisms/Sidebar', 'Article'),
  [routes.twitters]: linkTo('Organisms/Sidebar', 'Twitter'),
};

export const itemsPageLinks = {
  [routes.notes]: linkTo('Views/Notes'),
  [routes.articles]: linkTo('Views/Articles'),
  [routes.twitters]: linkTo('Views/Twitters'),
  [routes.login]: linkTo('Views/LoginPage'),
};

export const authPageLinks = {
  [routes.login]: linkTo('Views/LoginPage'),
  [routes.register]: linkTo('Views/RegisterPage'),
};
