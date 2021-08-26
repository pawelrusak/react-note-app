import withFormik from 'storybook-formik';
import StoryRouter from 'storybook-react-router';

import AuthFormBox, { AuthFormBoxProps } from './AuthFormBox';
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

export const Register = Template.bind({});
Register.args = {
  formVariant: 'register',
};
