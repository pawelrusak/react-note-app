import firebase from 'firebase/app';

import type { Variants, Item, Modify, Writeable, NewItem } from '~/commonTypes';

export type DocumentItemQueryArgs = {
  type: Variants;
  userID: null | string;
};

export type DocumentItem = Partial<DocumentItemQueryArgs> &
  Modify<
    Writeable<Item>,
    {
      id?: string;
      created?: firebase.firestore.Timestamp | string;
    }
  >;

export type NewDocumentItem = DocumentItemQueryArgs &
  NewItem & {
    created?: firebase.firestore.Timestamp;
  };

export type FirestoreDocumentItem = Modify<
  DocumentItem,
  {
    created: firebase.firestore.Timestamp;
  }
>;
