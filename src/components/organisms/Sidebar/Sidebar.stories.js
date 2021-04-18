import StoryRouter from 'storybook-react-router';
import { routes } from 'routes';
import { sidebarLinks } from '../../../../.storybook/links';
import Sidebar from './Sidebar';

export default {
  title: 'Organisms/Sidebar',
  component: Sidebar,
};

const Template = (args) => <Sidebar {...args} />;

export const Default = Template.bind({});
Default.decorators = [StoryRouter(sidebarLinks)];

export const Note = Template.bind({});
Note.decorators = [StoryRouter(sidebarLinks, { initialEntries: [routes.notes] })];
Note.parameters = {
  pageContext: 'notes',
};

export const Twitter = Template.bind({});
Twitter.decorators = [StoryRouter(sidebarLinks, { initialEntries: [routes.twitters] })];
Twitter.parameters = {
  pageContext: 'twitters',
};

export const Article = Template.bind({});
Article.decorators = [StoryRouter(sidebarLinks, { initialEntries: [routes.articles] })];
Article.parameters = {
  pageContext: 'articles',
};
