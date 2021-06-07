import { Meta, Story } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import * as CardStories from 'components/molecules/Card/Card.stories';
import { getEarlierDateOfDay } from 'utils';
import DetailsTemplate, { DetailsTemplateProps } from './DetailsTemplate';

export default {
  title: 'Templates/DetailsTemplate',
  component: DetailsTemplate,
  decorators: [StoryRouter()],
} as Meta;

const Template: Story<DetailsTemplateProps> = (args) => <DetailsTemplate {...args} />;

/**
 * @todo remove 'created' property in arguments composition after change his type in storied of Card in each DetailsTemplate stories
 */
export const Note = Template.bind({});
Note.args = {
  ...CardStories.Note.args,

  created: getEarlierDateOfDay(3),
};
Note.parameters = {
  pageContext: 'notes',
};

export const Twitter = Template.bind({});
Twitter.args = {
  ...CardStories.Twitter.args,
  created: getEarlierDateOfDay(3),
};
Twitter.parameters = {
  pageContext: 'twitters',
};

export const Article = Template.bind({});
Article.args = {
  ...CardStories.Article.args,
  created: getEarlierDateOfDay(3),
};
Article.parameters = {
  pageContext: 'articles',
};
