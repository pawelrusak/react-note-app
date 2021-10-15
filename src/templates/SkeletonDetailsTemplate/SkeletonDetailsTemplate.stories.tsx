import StoryRouter from 'storybook-react-router';

import SkeletonDetailsTemplate from './SkeletonDetailsTemplate';
import { StoreDecorator } from '~~/.storybook/decorators';

import type { Meta, Story } from '@storybook/react';

export default {
  title: 'Templates/SkeletonDetailsTemplate',
  component: SkeletonDetailsTemplate,
  decorators: [StoryRouter(), StoreDecorator],
} as Meta;

const Template: Story = () => <SkeletonDetailsTemplate />;

export const Note = Template.bind({});
Note.parameters = {
  pageVariant: 'notes',
};

export const Twitter = Template.bind({});
Twitter.parameters = {
  pageVariant: 'twitters',
};

export const Article = Template.bind({});
Article.parameters = {
  pageVariant: 'articles',
};
