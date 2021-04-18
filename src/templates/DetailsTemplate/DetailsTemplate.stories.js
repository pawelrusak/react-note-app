import StoryRouter from 'storybook-react-router';
import * as CardStories from 'components/molecules/Card/Card.stories';
import DetailsTemplate from './DetailsTemplate';

export default {
  title: 'Templates/DetailsTemplate',
  component: DetailsTemplate,
  decorators: [StoryRouter()],
};

const Template = (args) => <DetailsTemplate {...args} />;

export const Note = Template.bind({});
Note.args = {
  ...CardStories.Note.args,
};
Note.parameters = {
  pageContext: 'notes',
};

export const Twitter = Template.bind({});
Twitter.args = {
  ...CardStories.Twitter.args,
};
Twitter.parameters = {
  pageContext: 'twitters',
};

export const Article = Template.bind({});
Article.args = {
  ...CardStories.Article.args,
};
Article.parameters = {
  pageContext: 'articles',
};
