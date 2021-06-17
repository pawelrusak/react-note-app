import StoryRouter from 'storybook-react-router';

import { StoreDecorator, CardWrapperDecorator } from '../../../../.storybook/decorators';
import Card, { CardProps } from './Card';
import { getEarlierDateOfDay } from '~/utils';

import type { Meta, Story } from '@storybook/react';

export default {
  title: 'Molecules/Card',
  component: Card,
  decorators: [StoryRouter(), StoreDecorator, CardWrapperDecorator],
} as Meta;

const Template: Story<CardProps> = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: '8885d2d6-b081-4342-8232-e889affa9d93',
  title: 'My best note ever',
  created: getEarlierDateOfDay(3),
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
} as CardProps;
Twitter.parameters = {
  pageContext: 'twitters',
};

export const Article = Template.bind({});
Article.args = {
  ...Default.args,
  articleUrl: 'https://youtube.com/helloroman',
} as CardProps;
Article.parameters = {
  pageContext: 'articles',
};
