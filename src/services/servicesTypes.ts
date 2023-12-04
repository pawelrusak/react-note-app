import firebase from 'firebase/app';

import type { Variant, Item, Modify, Writeable, NewItem } from '~/commonTypes';

export type DocumentItemQueryArgs<V extends Variant = Variant> = {
  variant: V;
  userID: null | string;
};

export type DocumentItem<V extends Variant = Variant> = Partial<DocumentItemQueryArgs<V>> &
  Modify<
    Writeable<Item<V>>,
    {
      id?: string;
      created?: firebase.firestore.Timestamp | string;
    }
  >;

export type NewDocumentItem<V extends Variant = Variant> = DocumentItemQueryArgs<V> &
  NewItem<V> & {
    created?: firebase.firestore.Timestamp;
  };

export type FirestoreDocumentItem<V extends Variant = Variant> = Modify<
  DocumentItem<V>,
  {
    created: firebase.firestore.Timestamp;
  }
>;
