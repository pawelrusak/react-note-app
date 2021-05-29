import firebase from 'firebase/app';
import { ItemVariants, Item, Modify, Writeable } from 'commonTypes';

export type ServiceItem = {
  userID: string;
  type: ItemVariants;
} & Modify<Item, { created: firebase.firestore.Timestamp | Date }>;

export type ServiceAddItem = Omit<ServiceItem, 'created'>;

export type DocumentItem = Partial<{
  type: ItemVariants;
  userID: null | string;
}> &
  Modify<Writeable<Item>, { created: firebase.firestore.Timestamp | Date }>;
