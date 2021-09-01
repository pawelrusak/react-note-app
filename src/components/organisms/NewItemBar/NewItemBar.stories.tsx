import NewItemBar, { NewItemBarProps } from './NewItemBar';
import { StoreDecorator } from '~~/.storybook/decorators';

import type { Meta, Story } from '@storybook/react';

export default {
  title: 'Organisms/NewItemBar',
  component: NewItemBar,
  decorators: [StoreDecorator],
} as Meta;

const Template: Story<NewItemBarProps> = (args) => <NewItemBar {...args} />;

export const Note = Template.bind({});
Note.args = {
  handleClose: () => ({}),
  visible: true,
};
Note.parameters = {
  pageVariant: 'notes',
};

export const Twitter = Template.bind({});
Twitter.args = {
  ...Note.args,
};
Twitter.parameters = {
  pageVariant: 'twitters',
};

export const Articles = Template.bind({});
Articles.args = {
  ...Note.args,
};
Articles.parameters = {
  pageVariant: 'articles',
};
