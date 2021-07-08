import { AUTH_ERRORS_CODES } from './auth';

export const TEST_FAKE_NEW_NOTE_DATA_ID = 'test-fake-new-note-data-id';

export const TEST_FAKE_AUTH_USER_ID = 'test-fake-auth-user-id';

export const VALID_USER_CREDENTIAL = {
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
} as const;
