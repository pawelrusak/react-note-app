import SkeletonCard from './SkeletonCard';

import { CardWrapperDecorator } from '~~/.storybook/decorators';

import type { Meta, Story } from '@storybook/react';

export default {
  title: 'Molecules/SkeletonCard',
  component: SkeletonCard,
  decorators: [CardWrapperDecorator],
} as Meta;

const Template: Story = () => <SkeletonCard />;

export const Default = Template.bind({});

export const Note = Template.bind({});
Note.parameters = {
  pageContext: 'notes',
};

export const Twitter = Template.bind({});
Twitter.parameters = {
  pageContext: 'twitters',
};

export const Article = Template.bind({});
Article.parameters = {
  pageContext: 'articles',
};
