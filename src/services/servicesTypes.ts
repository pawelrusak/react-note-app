import firebase from 'firebase/app';
import { ItemVariants, Item, Modify } from 'commonTypes';

export type ServiceItem = {
  userID: string;
  type: ItemVariants;
} & Modify<Item, { created: firebase.firestore.Timestamp | Date }>;

export type ServiceAddItem = Omit<ServiceItem, 'created'>;

export type ServiceItemVariants = ItemVariants;

export type QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;

export type Timestamp = firebase.firestore.Timestamp;

export type QuerySnapshot = firebase.firestore.QuerySnapshot;
