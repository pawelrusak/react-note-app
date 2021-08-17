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
  pageContext: 'notes',
};

export const OneTwitter = Template.bind({});
OneTwitter.parameters = {
  pageContext: 'twitters',
};

export const OneArticle = Template.bind({});
OneArticle.parameters = {
  pageContext: 'articles',
};

export const ManyNotes = Template.bind({});
ManyNotes.parameters = {
  state: 'many',
  pageContext: 'notes',
};

export const ManyTwitters = Template.bind({});
ManyTwitters.parameters = {
  state: 'many',
  pageContext: 'twitters',
};

export const ManyArticles = Template.bind({});
ManyArticles.parameters = {
  state: 'many',
  pageContext: 'articles',
};

export const NotesSearch = Template.bind({});
NotesSearch.parameters = {
  state: 'search',
  pageContext: 'notes',
};

export const TwittersSearch = Template.bind({});
TwittersSearch.parameters = {
  state: 'search',
  pageContext: 'twitters',
};

export const ArticlesSearch = Template.bind({});
ArticlesSearch.parameters = {
  state: 'search',
  pageContext: 'articles',
};

/* visually identical for each variant */
export const Loading = Template.bind({});
Loading.parameters = {
  state: 'loading',
  pageContext: 'notes',
};
