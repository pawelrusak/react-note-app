import { nanoid } from '@reduxjs/toolkit';
import { fakeItemsData, fakeStateWithData } from 'testUtils/fakers';
import * as yup from 'yup';

import {
  AUTH_ERRORS,
  REGISTERED_USER_CREDENTIALS,
  SPECIAL_VALUE_TO_TEST_WEAK_PASSWORD,
} from '~/constants/tests';

import type { DocumentItemQueryArgs, NewDocumentItem } from '../servicesTypes';
import type { Variants, Item } from '~/commonTypes';

export const removeItem = async () => {
  try {
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchItems = async <V extends Variants>({ variant }: DocumentItemQueryArgs<V>) => {
  try {
    const data = fakeItemsData[variant] as Item<V>[];

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

export const addItem = async <V extends Variants>({ ...itemContent }: NewDocumentItem<V>) => {
  try {
    const data = {
      id: nanoid(),
      created: new Date().toISOString(),
      ...itemContent,
    };

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject(error);
  }
};

const isEmailBelongsToRegisterUser = (email: string) => {
  return REGISTERED_USER_CREDENTIALS.EMAIL === email;
};

const isRegisterUserButWithWrongPassword = (email: string, password: string) => {
  return isEmailBelongsToRegisterUser(email) && REGISTERED_USER_CREDENTIALS.PASSWORD !== password;
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
      uid: nanoid(),
    };
    return Promise.resolve({ user });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const logout = async () => Promise.resolve();
