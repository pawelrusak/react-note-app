import StoryRouter from 'storybook-react-router';
import UserPageTemplate from './UserPageTemplate';
import ViewPlaceholder from '../../../.storybook/components/ViewPlaceholder';

export default {
  title: 'Templates/UserPageTemplate',
  component: UserPageTemplate,
  decorators: [StoryRouter()],
};

const Template = () => (
  <UserPageTemplate>
    <ViewPlaceholder />
  </UserPageTemplate>
);

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
