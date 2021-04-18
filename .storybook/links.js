import { linkTo } from '@storybook/addon-links';
import { routes } from '../src/routes';

/**
 * @todo Create util function to create links set object like userPageTemplateLinks, gridTemplateLinks etc.
 */
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

export const gridTemplateLinks = {
  [routes.notes]: linkTo('Templates/GridTemplate', 'Note'),
  [routes.twitters]: linkTo('Templates/GridTemplate', 'Twitter'),
  [routes.articles]: linkTo('Templates/GridTemplate', 'Article'),
  [routes.login]: linkTo('Templates/AuthTemplate'),
};

export const userPageTemplateLinks = {
  [routes.notes]: linkTo('Templates/UserPageTemplate', 'Note'),
  [routes.twitters]: linkTo('Templates/UserPageTemplate', 'Twitter'),
  [routes.articles]: linkTo('Templates/UserPageTemplate', 'Article'),
  [routes.login]: linkTo('Templates/AuthTemplate'),
};
