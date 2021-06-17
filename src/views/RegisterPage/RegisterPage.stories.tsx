import StoryRouter from 'storybook-react-router';

import { StoreDecorator } from '../../../.storybook/decorators';
import { authPageLinks } from '../../../.storybook/links';
import RegisterPage from './RegisterPage';

import type { Meta, Story } from '@storybook/react';

export default {
  title: 'Views/RegisterPage',
  component: RegisterPage,
  decorators: [StoryRouter(authPageLinks), StoreDecorator],
} as Meta;

const Template: Story = (args) => <RegisterPage {...args} />;

export const Default = Template.bind({});
