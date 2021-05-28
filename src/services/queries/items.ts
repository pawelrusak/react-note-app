import { ServiceItemVariants, ServiceAddItem, ServiceItem } from '../servicesTypes';
import { serverTimestamp } from '../core';
import { getNotesCollectionRef, getNoteDocumentRefById } from '../refs/items';

export const queryGetItemsByTypeAndUserID = (
  type: ServiceItemVariants,
  userID: null | string = null,
) => getNotesCollectionRef().where('userID', '==', userID).where('type', '==', type).get();

export const queryGetItemByID = (id: string) => getNoteDocumentRefById(id).get();

export const queryRemoveItemByID = (id: string) => getNoteDocumentRefById(id).delete();

export const queryAddItem = ({ userID, type, ...itemContent }: ServiceAddItem) =>
  getNotesCollectionRef().add({
    userID,
    type,
    ...itemContent,
    created: serverTimestamp(),
  } as ServiceItem);
