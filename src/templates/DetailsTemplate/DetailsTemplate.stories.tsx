import StoryRouter from 'storybook-react-router';

import DetailsTemplate, { DetailsTemplateProps } from './DetailsTemplate';
import * as CardStories from '~/components/molecules/Card/Card.stories';
import { StoreDecorator } from '~~/.storybook/decorators';

import type { Meta, Story } from '@storybook/react';

export default {
  title: 'Templates/DetailsTemplate',
  component: DetailsTemplate,
  decorators: [StoreDecorator, StoryRouter()],
} as Meta;

const Template: Story<DetailsTemplateProps> = (args) => <DetailsTemplate {...args} />;

export const Note = Template.bind({});
Note.args = {
  ...CardStories.Note.args,
};
Note.parameters = {
  pageVariant: 'notes',
};

export const Twitter = Template.bind({});
Twitter.args = {
  ...CardStories.Twitter.args,
};
Twitter.parameters = {
  pageVariant: 'twitters',
};

export const Article = Template.bind({});
Article.args = {
  ...CardStories.Article.args,
};
Article.parameters = {
  pageVariant: 'articles',
};
