import { Formik } from 'formik';
import { Redirect } from 'react-router-dom';

import AuthForm from '~/components/organisms/AuthForm/AuthForm';
import { AUTH_ERRORS_CODES, ROUTES_PATHS } from '~/constants';
import { useAuth } from '~/hooks';
import AuthTemplate from '~/templates/AuthTemplate/AuthTemplate';
import { DocumentTitle } from '~/utils/components';
import * as validation from '~/validations';

import type firebase from 'firebase';

const LoginPage = () => {
  const { userID, authenticate } = useAuth();

  if (userID) {
    return <Redirect to={ROUTES_PATHS.home} />;
  }

  return (
    <>
      <DocumentTitle>Login</DocumentTitle>

      <AuthTemplate>
        <Formik
          validationSchema={validation.authSchema}
          initialValues={{ email: '', password: '' }}
          onSubmit={async ({ email, password }, actions) => {
            try {
              await authenticate(email, password);
            } catch (error) {
              const authError = error as firebase.auth.Error;

              if (AUTH_ERRORS_CODES.WRONG_PASSWORD === authError.code) {
                actions.setFieldError('password', authError.message);
              } else {
                actions.setFieldError('email', authError.message);
              }
            }
          }}
        >
          <AuthForm formVariant="login" />
        </Formik>
      </AuthTemplate>
    </>
  );
};

export default LoginPage;
