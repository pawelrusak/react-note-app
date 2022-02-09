import StoryRouter from 'storybook-react-router';

import Twitters from './Twitters';
import { routes } from '~/constants';
import { StoreDecorator } from '~~/.storybook/decorators';
import { itemsPageLinks } from '~~/.storybook/links';

import type { Meta, Story } from '@storybook/react';

export default {
  title: 'Views/Twitters',
  component: Twitters,
  decorators: [StoryRouter(itemsPageLinks, { initialEntries: [routes.twitters] }), StoreDecorator],
  parameters: {
    pageVariant: 'twitters',
  },
} as Meta;

const Template: Story = () => <Twitters />;

export const Loading = Template.bind({});
Loading.parameters = {
  state: 'loading',
};

export const Empty = Template.bind({});
Empty.parameters = {
  state: 'empty',
};

export const Succeeded = Template.bind({});
