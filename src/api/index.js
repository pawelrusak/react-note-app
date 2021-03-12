import { convertQuerySnapshot, convertQuerySnapshotItem } from 'utils';
import { queryItemsByTypeAndUserID, queryItemByID, queryRemoveItemByID } from './queries';
import { auth } from './firebase';

export const authenticateUser = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const fetchItems = async ({ type, userID } = {}) => {
  try {
    const querySnapshotResponse = await queryItemsByTypeAndUserID(type, userID);
    const data = convertQuerySnapshot(querySnapshotResponse);

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchItem = async (id) => {
  try {
    const querySnapshotResponse = await queryItemByID(id);
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
