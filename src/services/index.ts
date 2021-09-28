import { auth } from './core';
import {
  queryGetItemsByTypeAndUserID,
  queryGetItemByID,
  queryRemoveItemByID,
  queryAddItem,
} from './queries/items';

import type { NewDocumentItem, DocumentItemQueryArgs } from './servicesTypes';
import type { Item, Variants } from '~/commonTypes';

export const authenticateUser = (email: string, password: string) =>
  auth.signInWithEmailAndPassword(email, password);

export const register = (email: string, password: string) =>
  auth.createUserWithEmailAndPassword(email, password);

export const logout = () => auth.signOut();

export const fetchItems = async <V extends Variants = Variants>({
  variant,
  userID,
}: DocumentItemQueryArgs<V>) => {
  try {
    const itemsSnap = await queryGetItemsByTypeAndUserID<V>(variant, userID);
    const data = itemsSnap.docs.map((item) => item.data()) as Item<V>[];

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchItem = async <V extends Variants>(id: string) => {
  try {
    const itemSnap = await queryGetItemByID(id);
    const data = itemSnap.data() as Item<V>;

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const removeItem = async (id: string) => {
  try {
    await queryRemoveItemByID(id);

    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addItem = async <V extends Variants>({
  userID,
  variant,
  ...itemContent
}: NewDocumentItem<V>) => {
  try {
    const documentReference = await queryAddItem({ userID, variant, ...itemContent });
    const { data } = await fetchItem<V>(documentReference.id);

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject(error);
  }
};
