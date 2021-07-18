import StoryRouter from 'storybook-react-router';

import AuthTemplate from './AuthTemplate';
import ViewPlaceholder from '~~/.storybook/components/ViewPlaceholder';

import type { Meta, Story } from '@storybook/react';

export default {
  title: 'Templates/AuthTemplate',
  component: AuthTemplate,
  decorators: [StoryRouter()],
} as Meta;

const Template: Story = () => (
  <AuthTemplate>
    <ViewPlaceholder />
  </AuthTemplate>
);

export const Default = Template.bind({});
