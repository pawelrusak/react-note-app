import StoryRouter from 'storybook-react-router';
import Sidebar from './Sidebar';

export default {
  title: 'Organisms/Sidebar',
  component: Sidebar,
  decorators: [StoryRouter()],
};

const Template = (args) => <Sidebar {...args} />;

export const Default = Template.bind({});

export const Note = Template.bind({});
Note.parameters = {
  pageContext: 'notes',
};

export const Twitter = Template.bind({});
Twitter.parameters = {
  pageContext: 'twitters',
};

export const Article = Template.bind({});
Article.parameters = {
  pageContext: 'articles',
};
