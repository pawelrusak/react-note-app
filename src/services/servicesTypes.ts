import firebase from 'firebase/app';

import type { ItemVariants, Item, Modify, Writeable, NewItem } from '~/commonTypes';

export type DocumentItemQueryArgs = {
  type: ItemVariants;
  userID: null | string;
};

export type DocumentItem = Partial<DocumentItemQueryArgs> &
  Modify<
    Writeable<Item>,
    {
      id?: string;
      created?: firebase.firestore.Timestamp | Date;
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
