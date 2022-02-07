import withFormik from 'storybook-formik';

import NewItemForm, { NewItemFormProps } from './NewItemForm';
import { newItemSchema } from '~/validations';
import { NewItemFormDecorator } from '~~/.storybook/decorators';

import type { Meta, Story } from '@storybook/react';

export default {
  title: 'Organisms/NewItemForm',
  component: NewItemForm,
  decorators: [NewItemFormDecorator, withFormik],
  argTypes: {
    formVariant: {
      control: {
        type: 'inline-radio',
        options: ['notes', 'twitters', 'articles'],
      },
    },
  },
} as Meta;

const Template: Story<NewItemFormProps> = (args) => <NewItemForm {...args} />;

export const Note = Template.bind({});
Note.args = {
  formVariant: 'notes',
};
Note.parameters = {
  formik: {
    initialValues: {
      title: '',
      content: '',
    },
    validationSchema: newItemSchema,
    onSubmit: () => null,
  },
};

export const Twitter = Template.bind({});
Twitter.args = {
  formVariant: 'twitters',
};
Twitter.parameters = {
  formik: {
    initialValues: {
      title: '',
      content: '',
      twitterName: '',
    },
    validationSchema: newItemSchema,
    onSubmit: () => null,
  },
};

export const Articles = Template.bind({});
Articles.args = {
  formVariant: 'articles',
};
Articles.parameters = {
  formik: {
    initialValues: {
      title: '',
      content: '',
      articleUrl: '',
    },
    validationSchema: newItemSchema,
    onSubmit: () => null,
  },
};
