import SkeletonCard from './SkeletonCard';

import { CardWrapperDecorator } from '~~/.storybook/decorators';

import type { Meta, Story } from '@storybook/react';

export default {
  title: 'Molecules/SkeletonCard',
  component: SkeletonCard,
  decorators: [CardWrapperDecorator],
} as Meta;

const Template: Story = (args) => <SkeletonCard {...args} />;

export const Default = Template.bind({});

export const Note = Template.bind({});
Note.parameters = {
  pageVariant: 'notes',
};

export const LightenNote = Template.bind({});
LightenNote.args = {
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
  grey: true,
};
GreyNote.parameters = {
  pageVariant: 'notes',
};

export const Twitter = Template.bind({});
Twitter.parameters = {
  pageVariant: 'twitters',
};

export const LightenTwitter = Template.bind({});
LightenTwitter.args = {
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
  grey: true,
};
GreyTwitter.parameters = {
  pageVariant: 'twitters',
};

export const Article = Template.bind({});
Article.parameters = {
  pageVariant: 'articles',
};

export const LightenArticle = Template.bind({});
LightenArticle.args = {
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
  grey: true,
};
GreyArticle.parameters = {
  pageVariant: 'articles',
};
