import firebase from 'firebase';

import { db } from '../core';

import type { DocumentItem } from '../servicesTypes';
import type { Variants } from '~/commonTypes';

export const getNotesCollectionRef = <
  V extends Variants = Variants,
  T extends DocumentItem<V> = DocumentItem<V>,
>() => db.collection('notes') as firebase.firestore.CollectionReference<T>;

export const getNoteDocumentRefById = <V extends Variants = Variants>(
  id: Exclude<DocumentItem['id'], undefined>,
) => getNotesCollectionRef<V>().doc(id);
