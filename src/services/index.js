import { convertQuerySnapshot, convertQuerySnapshotItem } from './converters';
import {
  queryGetItemsByTypeAndUserID,
  queryGetItemByID,
  queryRemoveItemByID,
  queryAddItem,
} from './queries/items';
import { auth } from './firebase';

export const authenticateUser = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const fetchItems = async ({ type, userID } = {}) => {
  try {
    const querySnapshotResponse = await queryGetItemsByTypeAndUserID(type, userID);
    const data = convertQuerySnapshot(querySnapshotResponse);

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchItem = async (id) => {
  try {
    const querySnapshotResponse = await queryGetItemByID(id);
    const data = convertQuerySnapshotItem(querySnapshotResponse);

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const removeItem = async (id) => {
  try {
    const response = await queryRemoveItemByID(id);

    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addItem = async ({ userID, type, ...itemContent }) => {
  try {
    const documentReference = await queryAddItem({ userID, type, ...itemContent });
    const { data } = await fetchItem(documentReference.id);

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject(error);
  }
};
