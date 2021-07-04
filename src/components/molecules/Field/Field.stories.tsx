import withFormik from 'storybook-formik';

import Field, { FieldProps } from './Field';

import type { Meta, Story } from '@storybook/react';

export default {
  title: 'Molecules/Field',
  component: Field,
  decorators: [withFormik],
} as Meta;

const FIELD_NAME = 'email';

const Template: Story<FieldProps> = (args) => <Field {...args} name={FIELD_NAME} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'login',
};

export const WithFormikError = Template.bind({});
WithFormikError.args = {
  ...Default.args,
};
WithFormikError.parameters = {
  formik: {
    initialErrors: {
      [FIELD_NAME]: 'The error message from Formik',
    },
    initialTouched: {
      [FIELD_NAME]: true,
    },
  },
};
