import { itemConverter } from '../converters/items';
import { getNotesCollectionRef, getNoteDocumentRefById } from '../refs/items';

import type { NewDocumentItem } from '../servicesTypes';
import type { ItemVariants } from '~/commonTypes';

export const queryGetItemsByTypeAndUserID = (type: ItemVariants, userID: null | string = null) =>
  getNotesCollectionRef()
    .where('userID', '==', userID)
    .where('type', '==', type)
    .withConverter(itemConverter)
    .get();

export const queryGetItemByID = (id: string) =>
  getNoteDocumentRefById(id).withConverter(itemConverter).get();

export const queryRemoveItemByID = (id: string) => getNoteDocumentRefById(id).delete();

export const queryAddItem = (serviceItem: NewDocumentItem) =>
  getNotesCollectionRef().withConverter(itemConverter).add(serviceItem);
