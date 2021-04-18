import styled from 'styled-components';
import { Formik, Form } from 'formik';
import AuthTemplate from 'templates/AuthTemplate/AuthTemplate';
import Heading from 'components/atoms/Heading/Heading';
import Input from 'components/atoms/Input/Input';
import Button from 'components/atoms/Button/Button';
import { Link, Redirect } from 'react-router-dom';
import { routes } from 'routes';
import { connect } from 'react-redux';
import { authenticate as authenticateAction } from 'actions';

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
const LoginPage = ({ userID, authenticate }) => (
  <AuthTemplate>
    <Formik
      initialValues={{ username: '', password: '' }}
      // eslint-disable-next-line no-unused-vars
      onSubmit={({ username, password }) => {
        // eslint-disable-next-line no-console
        authenticate(username, password);
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
                type="text"
                name="username"
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
              <Button activeColor="notes" type="submit">
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

const mapStateToProps = ({ userID = null }) => ({ userID });

const mapDispatchToProps = (dispatch) => ({
  authenticate: (username, password) => dispatch(authenticateAction(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
