import StoryRouter from 'storybook-react-router';

import Sidebar from './Sidebar';
import { routes } from '~/constants';
import { StoreDecorator } from '~~/.storybook/decorators';
import { sidebarLinks } from '~~/.storybook/links';

import type { Meta, Story } from '@storybook/react';

export default {
  title: 'Organisms/Sidebar',
  component: Sidebar,
  decorators: [StoreDecorator],
} as Meta;

const Template: Story = (args) => <Sidebar {...args} />;

export const Note = Template.bind({});
Note.decorators = [StoryRouter(sidebarLinks, { initialEntries: [routes.notes] })];
Note.parameters = {
  pageVariant: 'notes',
};

export const Twitter = Template.bind({});
Twitter.decorators = [StoryRouter(sidebarLinks, { initialEntries: [routes.twitters] })];
Twitter.parameters = {
  pageVariant: 'twitters',
};

export const Article = Template.bind({});
Article.decorators = [StoryRouter(sidebarLinks, { initialEntries: [routes.articles] })];
Article.parameters = {
  pageVariant: 'articles',
};
