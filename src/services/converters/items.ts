import { Item } from 'commonTypes';
import { QueryDocumentSnapshot, Timestamp, QuerySnapshot, ServiceItem } from '../servicesTypes';

export const convertQuerySnapshotItem = (item: QueryDocumentSnapshot) => {
  const { created, ...rest } = item.data() as Partial<ServiceItem>;

  delete rest.userID;
  return {
    ...rest,
    id: item.id,
    created: (created as Timestamp).toDate(),
  } as Item;
};

export const convertQuerySnapshot = (querySnapshot: QuerySnapshot): Item[] =>
  querySnapshot.docs.map(convertQuerySnapshotItem);
