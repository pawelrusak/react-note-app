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
  pageContext: 'notes',
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
  pageContext: 'notes',
};

export const Twitter = Template.bind({});
Twitter.parameters = {
  pageContext: 'twitters',
};

export const LightenTwitter = Template.bind({});
LightenTwitter.args = {
  ...LightenNote.args,
};
LightenTwitter.argTypes = {
  ...LightenNote.argTypes,
};
LightenTwitter.parameters = {
  pageContext: 'twitters',
};

export const Article = Template.bind({});
Article.parameters = {
  pageContext: 'articles',
};

export const LightenArticle = Template.bind({});
LightenArticle.args = {
  ...LightenNote.args,
};
LightenArticle.argTypes = {
  ...LightenNote.argTypes,
};
LightenArticle.parameters = {
  pageContext: 'articles',
};
