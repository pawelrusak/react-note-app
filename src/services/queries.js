import { serverTimestamp } from './firebase';
import { notesCollectionRef, getNoteDocumentRefById } from './refs/items';

export const queryItemsByTypeAndUserID = (type, userID = null) =>
  notesCollectionRef.where('userID', '==', userID).where('type', '==', type).get();

export const queryItemByID = (id) => getNoteDocumentRefById(id).get();

export const queryRemoveItemByID = (id) => getNoteDocumentRefById(id).delete();

export const queryAddItem = ({ userID, type, ...itemContent }) =>
  notesCollectionRef.add({
    userID,
    type,
    ...itemContent,
    created: serverTimestamp(),
  });
