import StoryRouter from 'storybook-react-router';

import Notes from './Notes';
import { routes } from '~/routes';
import { StoreDecorator } from '~~/.storybook/decorators';
import { itemsPageLinks } from '~~/.storybook/links';

import type { Meta, Story } from '@storybook/react';

export default {
  title: 'Views/Notes',
  component: Notes,
  decorators: [StoryRouter(itemsPageLinks, { initialEntries: [routes.notes] }), StoreDecorator],
  parameters: {
    pageContext: 'notes',
  },
} as Meta;

const Template: Story = () => <Notes />;

export const Loading = Template.bind({});
Loading.parameters = {
  state: 'loading',
};

export const Succeeded = Template.bind({});
