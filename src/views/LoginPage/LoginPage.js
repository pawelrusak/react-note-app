import styled from 'styled-components';
import { Formik, Form } from 'formik';
import AuthTemplate from 'templates/AuthTemplate/AuthTemplate';
import Heading from 'components/atoms/Heading/Heading';
import Input from 'components/atoms/Input/Input';
import Button from 'components/atoms/Button/Button';
import { Link, Redirect } from 'react-router-dom';
import { routes } from 'routes';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate as authenticateAction } from 'actions';
import { userIDSelector } from 'selectors';

const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledInput = styled(Input)`
  margin: 0 0 30px 0;
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

/**
 * @todo Change name and type of the username field after finish the course.
 */
// eslint-disable-next-line react/prop-types
const LoginPage = () => {
  const userID = useSelector(userIDSelector);
  const dispatch = useDispatch();

  const authenticate = (email, password) => {
    dispatch(authenticateAction(email, password));
  };

  return (
    <AuthTemplate>
      <Formik
        initialValues={{ email: '', password: '' }}
        // eslint-disable-next-line no-unused-vars
        onSubmit={({ email, password }) => {
          // eslint-disable-next-line no-console
          authenticate(email, password);
        }}
      >
        {({ handleChange, handleBlur, values }) => {
          if (userID) {
            return <Redirect to={routes.home} />;
          }
          return (
            <>
              <Heading>Sign in</Heading>
              <StyledForm>
                <StyledInput
                  type="email"
                  name="email"
                  placeholder="Login"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                />
                <StyledInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                />
                <Button activecolor="notes" type="submit">
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
