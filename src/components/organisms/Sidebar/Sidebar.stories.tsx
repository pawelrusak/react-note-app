import StoryRouter from 'storybook-react-router';

import Sidebar from './Sidebar';
import { ROUTES_PATHS } from '~/constants';
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
Note.decorators = [StoryRouter(sidebarLinks, { initialEntries: [ROUTES_PATHS.notes] })];
Note.parameters = {
  pageVariant: 'notes',
};

export const Twitter = Template.bind({});
Twitter.decorators = [StoryRouter(sidebarLinks, { initialEntries: [ROUTES_PATHS.twitters] })];
Twitter.parameters = {
  pageVariant: 'twitters',
};

export const Article = Template.bind({});
Article.decorators = [StoryRouter(sidebarLinks, { initialEntries: [ROUTES_PATHS.articles] })];
Article.parameters = {
  pageVariant: 'articles',
};
