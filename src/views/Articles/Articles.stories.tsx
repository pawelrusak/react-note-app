import { Meta, Story } from '@storybook/react';
import StoryRouter from 'storybook-react-router';

import Articles from './Articles';
import { routes } from '~/routes';
import { StoreDecorator } from '~~/.storybook/decorators';
import { itemsPageLinks } from '~~/.storybook/links';

export default {
  title: 'Views/Articles',
  component: Articles,
  decorators: [StoryRouter(itemsPageLinks, { initialEntries: [routes.articles] }), StoreDecorator],
  parameters: {
    pageContext: 'articles',
  },
} as Meta;

const Template: Story = () => <Articles />;

export const Loading = Template.bind({});
Loading.parameters = {
  state: 'loading',
};

export const Succeeded = Template.bind({});
