import StoryRouter from 'storybook-react-router';

import { StoreDecorator } from '../../../.storybook/decorators';
import { authPageLinks } from '../../../.storybook/links';
import LoginPage from './LoginPage';

import type { Meta, Story } from '@storybook/react';

export default {
  title: 'Views/LoginPage',
  component: LoginPage,
  decorators: [StoryRouter(authPageLinks), StoreDecorator],
} as Meta;

const Template: Story = (args) => <LoginPage {...args} />;

export const Default = Template.bind({});
