import Card from './Card';

export default {
  title: 'Molecules/Card',
  component: Card,
  args: {
    title: 'My best note ever',
    created: '3 days',
    content: `Miles Dewey Davis III (May 26, 1926 -
       September 28, 1991) was an American jazz
       trumpeter, bandleader, and composer.`,
  },
};

const Template = (args) => <Card {...args} />;

export const Note = Template.bind({});
Note.args = {
  cardType: 'note',
};

export const Twitter = Template.bind({});
Twitter.args = {
  cardType: 'twitter',
  twitterName: 'hello_roman',
};

export const Article = Template.bind({});
Article.args = {
  cardType: 'article',
  articleUrl: 'https://youtube.com/helloroman',
};
