import StoryRouter from 'storybook-react-router';

import ViewPlaceholder from '../../../.storybook/components/ViewPlaceholder';
import AuthTemplate from './AuthTemplate';

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
