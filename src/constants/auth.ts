/**
 * Some of Firebase authorization error codes for the signInWithEmailAndPassword method.
 *
 * @see {@link https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithemailandpassword}
 *
 * This constant can be shared between tests and the code base.
 */
export const AUTH_ERRORS_CODES = {
  WRONG_PASSWORD: 'auth/user-disabled',
  USER_NOT_FOUND: 'auth/user-not-found',
} as const;
