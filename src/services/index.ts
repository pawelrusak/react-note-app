import { auth } from './core';
import {
  queryGetItemsByTypeAndUserID,
  queryGetItemByID,
  queryRemoveItemByID,
  queryAddItem,
} from './queries/items';

import type { NewDocumentItem, DocumentItemQueryArgs } from './servicesTypes';
import type { Item, Variant, AuthCredential } from '~/commonTypes';

export const authenticateUser = (
  email: AuthCredential['email'],
  password: AuthCredential['password'],
) => auth.signInWithEmailAndPassword(email, password);

export const register = (email: AuthCredential['email'], password: AuthCredential['password']) =>
  auth.createUserWithEmailAndPassword(email, password);

export const logout = () => auth.signOut();

export const fetchItems = async <V extends Variant = Variant>({
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

export const fetchItem = async <V extends Variant>(id: Item['id']) => {
  try {
    const itemSnap = await queryGetItemByID(id);
    const data = itemSnap.data() as Item<V>;

    if (!itemSnap.exists) {
      throw new Error('No details item found');
    }

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const removeItem = async (id: Item['id']) => {
  try {
    await queryRemoveItemByID(id);

    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addItem = async <V extends Variant>({
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
