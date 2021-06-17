import StoryRouter from 'storybook-react-router';

import ViewPlaceholder from '../../../.storybook/components/ViewPlaceholder';
import MainTemplate from './MainTemplate';

import type { Meta, Story } from '@storybook/react';

export default {
  title: 'Templates/MainTemplate',
  component: MainTemplate,
  decorators: [StoryRouter()],
} as Meta;

const Template: Story = (args) => (
  <MainTemplate {...args}>
    <ViewPlaceholder />
  </MainTemplate>
);

export const Default = Template.bind({});
