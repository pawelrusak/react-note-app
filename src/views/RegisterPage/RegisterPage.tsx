import { Formik, Form } from 'formik';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import Button from '~/components/atoms/Button/Button';
import Heading from '~/components/atoms/Heading/Heading';
import Input from '~/components/atoms/Input/Input';
import Field from '~/components/molecules/Field/Field';
import { useAuth } from '~/hooks';
import { routes } from '~/routes';
import AuthTemplate from '~/templates/AuthTemplate/AuthTemplate';
import * as validation from '~/validations';

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

const RegisterPage = () => {
  const { register, userID } = useAuth();

  return (
    <AuthTemplate>
      <Formik
        validationSchema={validation.authSchema}
        initialValues={{ email: '', password: '' }}
        onSubmit={({ email, password }) => {
          register(email, password);
        }}
      >
        {({ isSubmitting, touched, isValid }) => {
          if (userID) {
            return <Redirect to={routes.home} />;
          }
          return (
            <>
              <Heading id="register-page-form">Sign up</Heading>
              <StyledForm aria-labelledby="register-page-form">
                <StyledField
                  name="email"
                  type="email"
                  placeholder="Login"
                  component={StyledInput}
                  aria-required="true"
                />
                <StyledField
                  type="password"
                  name="password"
                  placeholder="Password"
                  component={StyledInput}
                  aria-required="true"
                />
                <Button
                  activecolor="notes"
                  type="submit"
                  pending={isSubmitting}
                  disabled={isSubmitting || ((touched.email || touched.password) && !isValid)}
                >
                  register
                </Button>
              </StyledForm>
              <StyledLink to={routes.login}>I want to log in!</StyledLink>
            </>
          );
        }}
      </Formik>
    </AuthTemplate>
  );
};

export default RegisterPage;
