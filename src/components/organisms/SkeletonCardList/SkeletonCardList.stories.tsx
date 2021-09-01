import SkeletonCardList from './SkeletonCardList';

import { SkeletonCardListGridDecorator } from '~~/.storybook/decorators';

import type { Meta, Story } from '@storybook/react';

export default {
  title: 'Organisms/SkeletonCardList',
  component: SkeletonCardList,
  decorators: [SkeletonCardListGridDecorator],
} as Meta;

const Template: Story = (args) => <SkeletonCardList {...args} />;

export const Default = Template.bind({});
Default.args = {
  length: 6,
};

export const Note = Template.bind({});
Note.args = {
  ...Default.args,
};
Note.parameters = {
  pageVariant: 'notes',
};

export const LightenNote = Template.bind({});
LightenNote.args = {
  ...Default.args,
  lighten: true,
  lightenAmount: 0.17,
};
LightenNote.argTypes = {
  lightenAmount: {
    control: { type: 'number', min: 0, max: 1, step: 0.01 },
  },
};
LightenNote.parameters = {
  pageVariant: 'notes',
};

export const GreyNote = Template.bind({});
GreyNote.args = {
  ...Default.args,
  grey: true,
};
GreyNote.parameters = {
  pageVariant: 'notes',
};

export const Twitter = Template.bind({});
Twitter.args = {
  ...Default.args,
};
Twitter.parameters = {
  pageVariant: 'twitters',
};

export const LightenTwitter = Template.bind({});
LightenTwitter.args = {
  ...Default.args,
  ...LightenNote.args,
};
LightenTwitter.argTypes = {
  ...LightenNote.argTypes,
};
LightenTwitter.parameters = {
  pageVariant: 'twitters',
};

export const GreyTwitter = Template.bind({});
GreyTwitter.args = {
  ...Default.args,
  grey: true,
};
GreyTwitter.parameters = {
  pageVariant: 'twitters',
};

export const Article = Template.bind({});
Article.args = {
  ...Default.args,
};
Article.parameters = {
  pageVariant: 'articles',
};

export const LightenArticle = Template.bind({});
LightenArticle.args = {
  ...Default.args,
  ...LightenNote.args,
};
LightenArticle.argTypes = {
  ...LightenNote.argTypes,
};
LightenArticle.parameters = {
  pageVariant: 'articles',
};

export const GreyArticle = Template.bind({});
GreyArticle.args = {
  ...Default.args,
  grey: true,
};
GreyArticle.parameters = {
  pageVariant: 'articles',
};
