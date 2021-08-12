import Counter from './Counter';
import { StoreDecorator } from '~~/.storybook/decorators';

import type { Meta, Story } from '@storybook/react';

export default {
  title: 'Molecules/Counter',
  component: Counter,
  decorators: [StoreDecorator],
} as Meta;

const Template: Story = () => <Counter />;

export const ManyNotes = Template.bind({});
ManyNotes.parameters = {
  pageContext: 'notes',
};

export const ManyTwitters = Template.bind({});
ManyTwitters.parameters = {
  pageContext: 'twitters',
};

export const ManyArticles = Template.bind({});
ManyArticles.parameters = {
  pageContext: 'articles',
};

/* visually identical for each variant */
export const Loading = Template.bind({});
Loading.parameters = {
  state: 'loading',
  pageContext: 'notes',
};
