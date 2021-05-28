import { db } from '../core';

export const getNotesCollectionRef = () => db.collection('notes');

export const getNoteDocumentRefById = (id: string) => getNotesCollectionRef().doc(id);
