import StoryRouter from 'storybook-react-router';

import Card, { CardProps } from './Card';
import { getEarlierDateOfDay } from '~/utils';
import { StoreDecorator, CardWrapperDecorator } from '~~/.storybook/decorators';

import type { Meta, Story } from '@storybook/react';
import type { Variant } from '~/commonTypes';

export default {
  title: 'Molecules/Card',
  component: Card,
  decorators: [StoryRouter(), StoreDecorator, CardWrapperDecorator],
} as Meta;

const Template: Story<CardProps<Variant>> = (args) => <Card {...args} />;

export const Note = Template.bind({});
Note.args = {
  id: '8885d2d6-b081-4342-8232-e889affa9d93',
  title: 'My best note ever',
  created: getEarlierDateOfDay(3).toISOString(),
  content:
    'Miles Dewey Davis III (May 26, 1926 - September 28, 1991) was an American jazz trumpeter, bandleader, and composer.',
};
Note.parameters = {
  pageVariant: 'notes',
};

export const NoteWithLongContent = Template.bind({});
NoteWithLongContent.args = {
  ...Note.args,
  content:
    `${Note.args.content as string} He is among the most influential and acclaimed ` +
    'figures in the history of jazz and 20th-century music. Davis adopted a ' +
    'variety of musical directions in a five-decade career that kept him at ' +
    'the forefront of many major stylistic developments in jazz.',
};
NoteWithLongContent.parameters = {
  pageVariant: 'notes',
};

export const Twitter = Template.bind({});
Twitter.args = {
  ...Note.args,
  twitterName: 'hello_roman',
} as CardProps<'twitters'>;
Twitter.parameters = {
  pageVariant: 'twitters',
};

export const TwitterWithLongContent = Template.bind({});
TwitterWithLongContent.args = {
  ...NoteWithLongContent.args,
  twitterName: Twitter.args.twitterName as string,
} as CardProps<'twitters'>;
TwitterWithLongContent.parameters = {
  pageVariant: 'twitters',
};

export const Article = Template.bind({});
Article.args = {
  ...Note.args,
  articleUrl: 'https://youtube.com/helloroman',
} as CardProps<'articles'>;
Article.parameters = {
  pageVariant: 'articles',
};

export const ArticleWithLongContent = Template.bind({});
ArticleWithLongContent.args = {
  ...NoteWithLongContent.args,
  articleUrl: Article.args.articleUrl as string,
} as CardProps<'articles'>;
ArticleWithLongContent.parameters = {
  pageVariant: 'articles',
};
