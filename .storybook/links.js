import { linkTo } from '@storybook/addon-links';
import { routes } from '../src/routes';

export const sidebarLinks = {
  [routes.notes]: linkTo('Organisms/Sidebar', 'Note'),
  [routes.articles]: linkTo('Organisms/Sidebar', 'Article'),
  [routes.twitters]: linkTo('Organisms/Sidebar', 'Twitter'),
};
