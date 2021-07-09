import { AUTH_ERRORS_CODES } from './auth';

export const TEST_FAKE_NEW_NOTE_DATA_ID = 'test-fake-new-note-data-id';

export const TEST_FAKE_AUTH_USER_ID = 'test-fake-auth-user-id';

export const REGISTERED_USER_CREDENTIALS = {
  email: 'valid.example@email.com',
  password: 'password', // the best password in the world
} as const;

export const AUTH_ERRORS = {
  USER_NOT_FOUND: {
    code: AUTH_ERRORS_CODES.USER_NOT_FOUND,
    message: 'User not found',
  },
  WRONG_PASSWORD: {
    code: AUTH_ERRORS_CODES.WRONG_PASSWORD,
    message: 'Wrong password',
  },
  EMAIL_ALREADY_IN_USE: {
    code: AUTH_ERRORS_CODES.EMAIL_ALREADY_IN_USE,
    message: 'Email already in use',
  },
  WEAK_PASSWORD: {
    code: AUTH_ERRORS_CODES.WEAK_PASSWORD,
    message: 'Weak password',
  },
  INVALID_EMAIL: {
    code: AUTH_ERRORS_CODES.INVALID_EMAIL,
    message: 'Invalid email',
  },
} as const;
