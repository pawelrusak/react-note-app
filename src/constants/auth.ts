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
