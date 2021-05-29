import { ServiceItemVariants, ServiceAddItem, DocumentItem } from '../servicesTypes';
import { getNotesCollectionRef, getNoteDocumentRefById } from '../refs/items';
import { itemConverter } from '../converters/items';

export const queryGetItemsByTypeAndUserID = (
  type: ServiceItemVariants,
  userID: null | string = null,
) =>
  getNotesCollectionRef()
    .where('userID', '==', userID)
    .where('type', '==', type)
    .withConverter(itemConverter)
    .get();

export const queryGetItemByID = (id: string) => getNoteDocumentRefById(id).get();

export const queryRemoveItemByID = (id: string) => getNoteDocumentRefById(id).delete();

export const queryAddItem = (serviceItem: ServiceAddItem) =>
  getNotesCollectionRef()
    .withConverter(itemConverter)
    .add(serviceItem as DocumentItem);
