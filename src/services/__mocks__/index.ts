import { fakeItemsData, fakeStateWithData } from 'testUtils/fakers';

import { TEST_FAKE_NEW_NOTE_DATA_ID, TEST_FAKE_AUTH_USER_ID } from '~/constants/test';

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

export const authenticateUser = async () => {
  try {
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
