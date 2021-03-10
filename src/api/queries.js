import { db } from './firebase';

export const queryNotesByTypeAndUserID = (type, userID = null) =>
  db.collection('notes').where('userID', '==', userID).where('type', '==', type).get();
