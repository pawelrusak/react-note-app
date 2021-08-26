import withFormik from 'storybook-formik';
import StoryRouter from 'storybook-react-router';

import AuthFormBox, { AuthFormBoxProps } from './AuthFormBox';
import { authSchema } from '~/validations';
import { AuthFormBoxCardDecorator } from '~~/.storybook/decorators';

import type { Meta, Story } from '@storybook/react';

export default {
  title: 'Organisms/AuthFormBox',
  component: AuthFormBox,
  decorators: [AuthFormBoxCardDecorator, StoryRouter(), withFormik],
} as Meta;

const Template: Story<AuthFormBoxProps> = (args) => <AuthFormBox {...args} />;

export const Login = Template.bind({});
Login.args = {
  formVariant: 'login',
};
Login.parameters = {
  formik: {
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: authSchema,
    onSubmit: () => null,
  },
};

export const Register = Template.bind({});
Register.args = {
  formVariant: 'register',
};
Register.parameters = {
  formik: {
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: authSchema,
    onSubmit: () => null,
  },
};
