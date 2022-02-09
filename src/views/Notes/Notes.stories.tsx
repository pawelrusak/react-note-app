import StoryRouter from 'storybook-react-router';

import Notes from './Notes';
import { routes } from '~/constants';
import { StoreDecorator } from '~~/.storybook/decorators';
import { itemsPageLinks } from '~~/.storybook/links';

import type { Meta, Story } from '@storybook/react';

export default {
  title: 'Views/Notes',
  component: Notes,
  decorators: [StoryRouter(itemsPageLinks, { initialEntries: [routes.notes] }), StoreDecorator],
  parameters: {
    pageVariant: 'notes',
  },
} as Meta;

const Template: Story = () => <Notes />;

export const Loading = Template.bind({});
Loading.parameters = {
  state: 'loading',
};

export const Empty = Template.bind({});
Empty.parameters = {
  state: 'empty',
};

export const Succeeded = Template.bind({});
