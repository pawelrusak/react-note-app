import { fakeItemsData, fakeStateWithData } from 'testUtils/fakers';
import * as yup from 'yup';

import {
  TEST_FAKE_NEW_NOTE_DATA_ID,
  TEST_FAKE_AUTH_USER_ID,
  REGISTERED_USER_CREDENTIALS,
  AUTH_ERRORS,
  SPECIAL_VALUE_TO_TEST_WEAK_PASSWORD,
} from '~/constants/tests';

import type { ItemVariants } from '~/commonTypes';

export const removeItem = async () => {
  try {
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchItems = async ({ type }: { type: ItemVariants }) => {
  try {
    const data = fakeItemsData[type];

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchItem = async (id: string) => {
  try {
    const { notes } = fakeStateWithData.items;

    const data = notes.find((item) => item.id === id);

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addItem = async ({ ...itemContent }) => {
  try {
    const data = {
      id: TEST_FAKE_NEW_NOTE_DATA_ID,
      created: new Date().toISOString(),
      ...itemContent,
    };

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject(error);
  }
};

const isEmailBelongsToRegisterUser = (email: string) => {
  return REGISTERED_USER_CREDENTIALS.email === email;
};

const isRegisterUserButWithWrongPassword = (email: string, password: string) => {
  return isEmailBelongsToRegisterUser(email) && REGISTERED_USER_CREDENTIALS.password !== password;
};

export const authenticateUser = async (email: string, password: string) => {
  try {
    if (!isEmailBelongsToRegisterUser(email)) {
      throw AUTH_ERRORS.USER_NOT_FOUND;
    }
    if (isRegisterUserButWithWrongPassword(email, password)) {
      throw AUTH_ERRORS.WRONG_PASSWORD;
    }

    const user = {
      uid: 'testUid',
    };
    return Promise.resolve({ user });
  } catch (error) {
    return Promise.reject(error);
  }
};

const isValidEmail = (email: string) => {
  return yup.string().email().required().isValidSync(email);
};
/**
 * Return true when using a weak password (less than 6 chars) to create a new account,
 * or do not use the special value to test for a weak password.
 *
 * @see {@link https://firebase.google.com/docs/reference/android/com/google/firebase/auth/FirebaseAuthWeakPasswordException}
 */
const isStrongPassword = (password: string) => {
  const MIN_PASSWORD_LENGTH = 6;
  const passwordLongEnough = yup.string().min(MIN_PASSWORD_LENGTH).required().isValidSync(password);

  return passwordLongEnough && SPECIAL_VALUE_TO_TEST_WEAK_PASSWORD !== password;
};

export const register = async (email: string, password: string) => {
  try {
    if (isEmailBelongsToRegisterUser(email)) {
      throw AUTH_ERRORS.EMAIL_ALREADY_IN_USE;
    }
    if (!isStrongPassword(password)) {
      throw AUTH_ERRORS.WEAK_PASSWORD;
    }
    if (!isValidEmail(email)) {
      throw AUTH_ERRORS.INVALID_EMAIL;
    }

    const user = {
      uid: TEST_FAKE_AUTH_USER_ID,
    };
    return Promise.resolve({ user });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const logout = async () => Promise.resolve();
