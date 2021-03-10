import { convertQuerySnapshot } from 'utils';
import { queryNotesByTypeAndUserID } from './queries';
import { auth } from './firebase';

export const authenticateUser = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const fetchItems = async ({ type, userID } = {}) => {
  try {
    const querySnapshotResponse = await queryNotesByTypeAndUserID(type, userID);
    const data = convertQuerySnapshot(querySnapshotResponse);

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject(error);
  }
};
