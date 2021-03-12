import { notesCollectionRef, getNoteDocumentRefById } from './refs';

export const queryItemsByTypeAndUserID = (type, userID = null) =>
  notesCollectionRef.where('userID', '==', userID).where('type', '==', type).get();

export const queryItemByID = (id) => getNoteDocumentRefById(id).get();

export const queryRemoveItemByID = (id) => getNoteDocumentRefById(id).delete();
