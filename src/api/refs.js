import { db } from './firebase';

export const notesCollectionRef = db.collection('notes');

export const getNoteDocumentRefById = (id) => notesCollectionRef.doc(id);
