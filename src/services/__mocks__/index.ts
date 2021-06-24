import { fakeItemsData } from 'testUtils/fakers';

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
