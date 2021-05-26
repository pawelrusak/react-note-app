import { Meta, Story } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import MainTemplate from './MainTemplate';
import ViewPlaceholder from '../../../.storybook/components/ViewPlaceholder';

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
