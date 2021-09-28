import { itemConverter } from '../converters/items';
import { getNotesCollectionRef, getNoteDocumentRefById } from '../refs/items';

import type { NewDocumentItem } from '../servicesTypes';
import type { Variants } from '~/commonTypes';

export const queryGetItemsByTypeAndUserID = <V extends Variants = Variants>(
  type: V,
  userID: null | string = null,
) =>
  getNotesCollectionRef<V>()
    .where('userID', '==', userID)
    .where('type', '==', type)
    .orderBy('created', 'desc')
    .withConverter(itemConverter)
    .get();

export const queryGetItemByID = <V extends Variants = Variants>(id: string) =>
  getNoteDocumentRefById<V>(id).withConverter(itemConverter).get();

export const queryRemoveItemByID = (id: string) => getNoteDocumentRefById(id).delete();

export const queryAddItem = (serviceItem: NewDocumentItem) =>
  getNotesCollectionRef().withConverter(itemConverter).add(serviceItem);
