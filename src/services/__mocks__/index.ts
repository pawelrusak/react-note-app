import { fakeItemsData, fakeStateWithData } from 'testUtils/fakers';

import {
  TEST_FAKE_NEW_NOTE_DATA_ID,
  TEST_FAKE_AUTH_USER_ID,
  VALID_USER_CREDENTIAL,
  AUTH_ERRORS,
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
  return VALID_USER_CREDENTIAL.email === email;
};

const isCredentialBelongsToRegisterUser = (email: string, password: string) => {
  return isEmailBelongsToRegisterUser(email) && VALID_USER_CREDENTIAL.password !== password;
};

export const authenticateUser = async (email: string, password: string) => {
  try {
    if (!isEmailBelongsToRegisterUser(email)) {
      throw AUTH_ERRORS.USER_NOT_FOUND;
    }
    if (isCredentialBelongsToRegisterUser(email, password)) {
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

export const register = async () => {
  try {
    const user = {
      uid: TEST_FAKE_AUTH_USER_ID,
    };
    return Promise.resolve({ user });
  } catch (error) {
    return Promise.reject(error);
  }
};
