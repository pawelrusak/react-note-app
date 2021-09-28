import firebase from 'firebase/app';

import type { Variants, Item, Modify, Writeable, NewItem } from '~/commonTypes';

export type DocumentItemQueryArgs<V extends Variants = Variants> = {
  type: V;
  userID: null | string;
};

export type DocumentItem<V extends Variants = Variants> = Partial<DocumentItemQueryArgs<V>> &
  Modify<
    Writeable<Item<V>>,
    {
      id?: string;
      created?: firebase.firestore.Timestamp | string;
    }
  >;

export type NewDocumentItem<V extends Variants = Variants> = DocumentItemQueryArgs<V> &
  NewItem<V> & {
    created?: firebase.firestore.Timestamp;
  };

export type FirestoreDocumentItem<V extends Variants = Variants> = Modify<
  DocumentItem<V>,
  {
    created: firebase.firestore.Timestamp;
  }
>;
