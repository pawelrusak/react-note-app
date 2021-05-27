import { db } from '../firebase';

export const getNotesCollectionRef = () => db.collection('notes');

export const getNoteDocumentRefById = (id) => getNotesCollectionRef().doc(id);
