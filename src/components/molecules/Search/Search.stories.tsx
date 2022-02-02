// import StoryRouter from 'storybook-react-router';

import Search from './Search';
// import { routes } from '~/routes';
import { StoreDecorator } from '~~/.storybook/decorators';

import type { Meta, Story } from '@storybook/react';

export default {
  title: 'Molecules/Search',
  component: Search,
  // decorators: [StoryRouter({}, { initialEntries: [routes.notes] }), StoreDecorator],
  decorators: [StoreDecorator],
} as Meta;

export const Default: Story = () => <Search />;
Default.parameters = {
  pageVariant: 'notes',
};
