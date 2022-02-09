import { ROUTES_PATHS } from './route';

import type { RoutesPaths } from '~/commonTypes';

/**
 * This constant can be shared between tests and the code base.
 */
export const AUTH_ERRORS_CODES = {
  /**
   * Some of Firebase authorization error codes for the signInWithEmailAndPassword method.
   *
   * @see {@link https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithemailandpassword}
   */
  WRONG_PASSWORD: 'auth/wrong-password',
  USER_NOT_FOUND: 'auth/user-not-found',
  /**
   * Some of Firebase authorization error codes for the createUserWithEmailAndPassword method.
   *
   *  @see {@link https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createuserwithemailandpassword}
   */
  EMAIL_ALREADY_IN_USE: 'auth/email-already-in-use',
  WEAK_PASSWORD: 'auth/weak-password',
  INVALID_EMAIL: 'auth/invalid-email',
} as const;

type AuthFormData = {
  readonly headingText: string;
  readonly buttonText: string;
  readonly linkText: string;
  readonly linkPath: RoutesPaths;
};

type AuthFormDataVariants = {
  readonly login: AuthFormData;
  readonly register: AuthFormData;
};

export const AUTH_FORM_DATA_VARIANTS: AuthFormDataVariants = {
  login: {
    headingText: 'Sign in',
    buttonText: 'sign in',
    linkText: 'I want my account!',
    linkPath: ROUTES_PATHS.register,
  },
  register: {
    headingText: 'Sign up',
    buttonText: 'register',
    linkText: 'I want to log in!',
    linkPath: ROUTES_PATHS.login,
  },
} as const;
