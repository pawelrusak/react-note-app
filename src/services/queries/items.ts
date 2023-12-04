import { itemConverter } from '../converters/items';
import { getNotesCollectionRef, getNoteDocumentRefById } from '../refs/items';

import type { NewDocumentItem, DocumentItem } from '../servicesTypes';
import type { Variant } from '~/commonTypes';

export const queryGetItemsByTypeAndUserID = <V extends Variant = Variant>(
  type: V,
  userID: null | string = null,
) =>
  getNotesCollectionRef<V>()
    .where('userID', '==', userID)
    .where('type', '==', type)
    .orderBy('created', 'desc')
    .withConverter(itemConverter)
    .get();

export const queryGetItemByID = <V extends Variant = Variant>(
  id: Exclude<DocumentItem['id'], undefined>,
) => getNoteDocumentRefById<V>(id).withConverter(itemConverter).get();

export const queryRemoveItemByID = (id: Exclude<DocumentItem['id'], undefined>) =>
  getNoteDocumentRefById(id).delete();

export const queryAddItem = (serviceItem: NewDocumentItem) =>
  getNotesCollectionRef().withConverter(itemConverter).add(serviceItem);
