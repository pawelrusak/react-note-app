import { Meta, Story } from '@storybook/react';
import StoryRouter from 'storybook-react-router';

import Articles from './Articles';
import { ROUTES_PATHS } from '~/constants';
import { StoreDecorator } from '~~/.storybook/decorators';
import { itemsPageLinks } from '~~/.storybook/links';

export default {
  title: 'Views/Articles',
  component: Articles,
  decorators: [
    StoryRouter(itemsPageLinks, { initialEntries: [ROUTES_PATHS.articles] }),
    StoreDecorator,
  ],
  parameters: {
    pageVariant: 'articles',
  },
} as Meta;

const Template: Story = () => <Articles />;

export const Loading = Template.bind({});
Loading.parameters = {
  state: 'loading',
};

export const Empty = Template.bind({});
Empty.parameters = {
  state: 'empty',
};

export const Succeeded = Template.bind({});
