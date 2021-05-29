import firebase from 'firebase/app';
import { ItemVariants, Item, Modify, Writeable } from 'commonTypes';

export type DocumentItemQueryArgs = {
  type: ItemVariants;
  userID: null | string;
};

export type DocumentItem = Partial<DocumentItemQueryArgs> &
  Modify<Writeable<Item>, { created?: firebase.firestore.Timestamp | Date }>;

export type FirestoreDocumentItem = Modify<
  DocumentItem,
  {
    created: firebase.firestore.Timestamp;
  }
>;
