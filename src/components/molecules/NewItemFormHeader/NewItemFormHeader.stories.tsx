import NewItemFormHeader, { NewItemFormHeaderProps } from './NewItemFormHeader';

import type { Meta, Story } from '@storybook/react';

export default {
  title: 'Molecules/NewItemFormHeader',
  component: NewItemFormHeader,
  argTypes: {
    variant: {
      control: {
        type: 'inline-radio',
        options: ['notes', 'twitters', 'articles'],
      },
    },
  },
} as Meta;

const Template: Story<NewItemFormHeaderProps> = (args) => <NewItemFormHeader {...args} />;

export const NoteFormHeader = Template.bind({});
NoteFormHeader.args = {
  headingId: 'example-id',
  variant: 'notes',
};

export const TwitterFormHeader = Template.bind({});
TwitterFormHeader.args = {
  ...NoteFormHeader.args,
  variant: 'twitters',
};

export const ArticleFormHeader = Template.bind({});
ArticleFormHeader.args = {
  ...NoteFormHeader.args,
  variant: 'articles',
};
