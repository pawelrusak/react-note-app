import StoryRouter from 'storybook-react-router';
import Card from './Card';
import { StoreDecorator, CardWrapperDecorator } from '../../../../.storybook/decorators';

export default {
  title: 'Molecules/Card',
  component: Card,
  decorators: [StoryRouter(), StoreDecorator, CardWrapperDecorator],
};

const Template = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: '8885d2d6-b081-4342-8232-e889affa9d93',
  title: 'My best note ever',
  created: '3 days',
  content:
    'Miles Dewey Davis III (May 26, 1926 - September 28, 1991) was an American jazz trumpeter, bandleader, and composer.',
};

export const Note = Template.bind({});
Note.args = {
  ...Default.args,
};
Note.parameters = {
  pageContext: 'notes',
};

export const Twitter = Template.bind({});
Twitter.args = {
  ...Default.args,
  twitterName: 'hello_romans',
};
Twitter.parameters = {
  pageContext: 'twitters',
};

export const Article = Template.bind({});
Article.args = {
  ...Default.args,
  articleUrl: 'https://youtube.com/helloroman',
};
Article.parameters = {
  pageContext: 'articles',
};
