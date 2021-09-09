import ConfirmationModal, { ConfirmationModalProps } from './ConfirmationModal';

import type { Meta, Story } from '@storybook/react';

export default {
  title: 'Molecules/ConfirmationModal',
  component: ConfirmationModal,
  argTypes: {
    onConfirm: {
      action: 'clicked',
    },
    onCancel: {
      action: 'clicked',
    },
    variant: {
      control: {
        type: 'inline-radio',
        options: ['notes', 'twitters', 'articles'],
      },
    },
  },
} as Meta;

const Template: Story<ConfirmationModalProps> = (args) => <ConfirmationModal {...args} />;

export const Note = Template.bind({});
Note.args = {
  show: true,
  variant: 'notes',
};

export const Twitter = Template.bind({});
Twitter.args = {
  ...Note.args,
  variant: 'twitters',
};

export const Article = Template.bind({});
Article.args = {
  ...Note.args,
  variant: 'articles',
};
