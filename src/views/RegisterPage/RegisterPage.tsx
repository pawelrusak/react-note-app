import { Formik } from 'formik';
import { Redirect } from 'react-router-dom';

import AuthFormBox from '~/components/organisms/AuthFormBox/AuthFormBox';
import { AUTH_ERRORS_CODES } from '~/constants/auth';
import { useAuth } from '~/hooks';
import { routes } from '~/routes';
import AuthTemplate from '~/templates/AuthTemplate/AuthTemplate';
import { DocumentTitle } from '~/utils/components';
import * as validation from '~/validations';

import type firebase from 'firebase';

const RegisterPage = () => {
  const { register, userID } = useAuth();

  if (userID) {
    return <Redirect to={routes.home} />;
  }

  return (
    <>
      <DocumentTitle>Register</DocumentTitle>

      <AuthTemplate>
        <Formik
          validationSchema={validation.authSchema}
          initialValues={{ email: '', password: '' }}
          onSubmit={async ({ email, password }, { setFieldError }) => {
            try {
              await register(email, password);
            } catch (error) {
              const authError = error as firebase.auth.Error;

              // only the "weak password" error applies to the password field
              if (AUTH_ERRORS_CODES.WEAK_PASSWORD === authError.code) {
                setFieldError('password', authError.message);
              } else {
                setFieldError('email', authError.message);
              }
            }
          }}
        >
          <AuthFormBox formVariant="register" />
        </Formik>
      </AuthTemplate>
    </>
  );
};

export default RegisterPage;
