import { convertQuerySnapshot, convertQuerySnapshotItem } from 'utils';
import { queryItemsByTypeAndUserID, queryItemByID } from './queries';
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
