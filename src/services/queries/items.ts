import { itemConverter } from '../converters/items';
import { getNotesCollectionRef, getNoteDocumentRefById } from '../refs/items';

import type { NewDocumentItem } from '../servicesTypes';
import type { Variants } from '~/commonTypes';

export const queryGetItemsByTypeAndUserID = (type: Variants, userID: null | string = null) =>
  getNotesCollectionRef()
    .where('userID', '==', userID)
    .where('type', '==', type)
    .orderBy('created', 'desc')
    .withConverter(itemConverter)
    .get();

export const queryGetItemByID = (id: string) =>
  getNoteDocumentRefById(id).withConverter(itemConverter).get();

export const queryRemoveItemByID = (id: string) => getNoteDocumentRefById(id).delete();

export const queryAddItem = (serviceItem: NewDocumentItem) =>
  getNotesCollectionRef().withConverter(itemConverter).add(serviceItem);
