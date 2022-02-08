import withFormik from 'storybook-formik';
import StoryRouter from 'storybook-react-router';

import AuthForm, { AuthFormProps } from './AuthForm';
import { authSchema } from '~/validations';
import { AuthFormCardDecorator } from '~~/.storybook/decorators';

import type { Meta, Story } from '@storybook/react';

export default {
  title: 'Organisms/AuthForm',
  component: AuthForm,
  decorators: [AuthFormCardDecorator, StoryRouter(), withFormik],
} as Meta;

const Template: Story<AuthFormProps> = (args) => <AuthForm {...args} />;

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
