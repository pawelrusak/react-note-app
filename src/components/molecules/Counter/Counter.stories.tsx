import Counter from './Counter';
import { StoreDecorator } from '~~/.storybook/decorators';

import type { Meta, Story } from '@storybook/react';

export default {
  title: 'Molecules/Counter',
  component: Counter,
  decorators: [StoreDecorator],
} as Meta;

const Template: Story = () => <Counter />;

export const OneNote = Template.bind({});
OneNote.parameters = {
  pageVariant: 'notes',
};

export const OneTwitter = Template.bind({});
OneTwitter.parameters = {
  pageVariant: 'twitters',
};

export const OneArticle = Template.bind({});
OneArticle.parameters = {
  pageVariant: 'articles',
};

export const ManyNotes = Template.bind({});
ManyNotes.parameters = {
  state: 'many',
  pageVariant: 'notes',
};

export const ManyTwitters = Template.bind({});
ManyTwitters.parameters = {
  state: 'many',
  pageVariant: 'twitters',
};

export const ManyArticles = Template.bind({});
ManyArticles.parameters = {
  state: 'many',
  pageVariant: 'articles',
};

export const NotesSearch = Template.bind({});
NotesSearch.parameters = {
  state: 'search',
  pageVariant: 'notes',
};

export const TwittersSearch = Template.bind({});
TwittersSearch.parameters = {
  state: 'search',
  pageVariant: 'twitters',
};

export const ArticlesSearch = Template.bind({});
ArticlesSearch.parameters = {
  state: 'search',
  pageVariant: 'articles',
};

/* visually identical for all variants */
export const Loading = Template.bind({});
Loading.parameters = {
  state: 'loading',
  pageVariant: 'notes',
};
