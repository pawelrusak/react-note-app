import { Form, useFormikContext } from 'formik';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button from '~/components/atoms/Button/Button';
import Heading from '~/components/atoms/Heading/Heading';
import Input from '~/components/atoms/Input/Input';
import Field from '~/components/molecules/Field/Field';
import { routes } from '~/routes';

const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledInput = styled(Input)`
  height: 40px;
  width: 100%;
`;

const StyledField = styled(Field)`
  display: block;
  width: 300px;
`;

const StyledLink = styled(Link)`
  display: block;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: black;
  text-transform: uppercase;
  margin: 20px 0 50px;
`;

type AuthFormFields = {
  email: string;
  password: string;
};

export type AuthFormBoxProps = {
  readonly formVariant: 'login' | 'register';
};

const AuthFormBox = ({ formVariant }: AuthFormBoxProps) => {
  const { isSubmitting, touched, isValid } = useFormikContext<AuthFormFields>();

  return (
    <>
      <Heading id="auth-form">
        {formVariant === 'login' && 'Sign in'}
        {formVariant === 'register' && 'Sign up'}
      </Heading>
      <StyledForm aria-labelledby="auth-form">
        <StyledField
          name="email"
          type="email"
          placeholder="Login"
          component={StyledInput}
          aria-required="true"
        />
        <StyledField
          name="password"
          type="password"
          placeholder="Password"
          component={StyledInput}
          aria-required="true"
        />
        <Button
          type="submit"
          pending={isSubmitting}
          disabled={isSubmitting || (touched.email && touched.password && !isValid)}
        >
          {formVariant === 'login' && 'sign in'}
          {formVariant === 'register' && 'register'}
        </Button>
      </StyledForm>
      {formVariant === 'login' && <StyledLink to={routes.register}>I want my account!</StyledLink>}
      {formVariant === 'register' && <StyledLink to={routes.login}>I want to log in!</StyledLink>}
    </>
  );
};

export default AuthFormBox;
