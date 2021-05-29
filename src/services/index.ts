import { Item, ItemVariants } from 'commonTypes';
import {
  queryGetItemsByTypeAndUserID,
  queryGetItemByID,
  queryRemoveItemByID,
  queryAddItem,
} from './queries/items';
import { auth } from './core';
import { ServiceAddItem } from './servicesTypes';

export const authenticateUser = (email: string, password: string) =>
  auth.signInWithEmailAndPassword(email, password);

type FetchItemsArgs = {
  readonly type: ItemVariants;
  readonly userID: string;
};

export const fetchItems = async ({ type, userID }: FetchItemsArgs) => {
  try {
    const itemsSnap = await queryGetItemsByTypeAndUserID(type, userID);
    const data = itemsSnap.docs.map((item) => item.data()) as Item[];

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchItem = async (id: string) => {
  try {
    const itemSnap = await queryGetItemByID(id);
    const data = itemSnap.data();

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const removeItem = async (id: string) => {
  try {
    const response = await queryRemoveItemByID(id);

    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addItem = async ({ userID, type, ...itemContent }: ServiceAddItem) => {
  try {
    const documentReference = await queryAddItem({ userID, type, ...itemContent });
    const { data } = await fetchItem(documentReference.id);

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject(error);
  }
};
