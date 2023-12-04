import firebase from 'firebase';

import { db } from '../core';

import type { DocumentItem } from '../servicesTypes';
import type { Variant } from '~/commonTypes';

export const getNotesCollectionRef = <
  V extends Variant = Variant,
  T extends DocumentItem<V> = DocumentItem<V>,
>() => db.collection('notes') as firebase.firestore.CollectionReference<T>;

export const getNoteDocumentRefById = <V extends Variant = Variant>(
  id: Exclude<DocumentItem['id'], undefined>,
) => getNotesCollectionRef<V>().doc(id);
