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

const LoginPage = () => {
  const { userID, authenticate } = useAuth();

  return (
    <AuthTemplate>
      <Formik
        validationSchema={validation.authSchema}
        initialValues={{ email: '', password: '' }}
        onSubmit={({ email, password }) => {
          authenticate(email, password);
        }}
      >
        {({ isSubmitting, touched, isValid }) => {
          if (userID) {
            return <Redirect to={routes.home} />;
          }
          return (
            <>
              <Heading id="login-page-form">Sign in</Heading>
              <StyledForm aria-labelledby="login-page-form">
                <Field
                  name="email"
                  type="email"
                  placeholder="Login"
                  as={StyledInput}
                  aria-required="true"
                />
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  as={StyledInput}
                  aria-required="true"
                />
                <Button
                  activecolor="notes"
                  type="submit"
                  pending={isSubmitting}
                  disabled={isSubmitting || (touched.email && touched.password && !isValid)}
                >
                  sign in
                </Button>
              </StyledForm>
              <StyledLink to={routes.register}>I want my account!</StyledLink>
            </>
          );
        }}
      </Formik>
    </AuthTemplate>
  );
};

export default LoginPage;
