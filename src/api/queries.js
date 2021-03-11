import { db } from './firebase';

export const queryItemsByTypeAndUserID = (type, userID = null) =>
  db.collection('notes').where('userID', '==', userID).where('type', '==', type).get();

export const queryItemByID = (id) => db.collection('notes').doc(id).get();
