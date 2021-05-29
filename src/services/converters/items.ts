import firebase from 'firebase/app';
import { Item, Modify } from 'commonTypes';
import { isArticleItem, isTwitterItem } from 'utils/guards';
import {
  QueryDocumentSnapshot,
  Timestamp,
  QuerySnapshot,
  ServiceItem,
  DocumentItem,
} from '../servicesTypes';
import { serverTimestamp } from '../core';

type RestItemData =
  | { articleUrl: string; twitterName: never }
  | { articleUrl: never; twitterName: string }
  | { articleUrl: never; twitterName: never };

export const convertQuerySnapshotItem = (item: QueryDocumentSnapshot): Item => {
  const data = item.data() as Modify<ServiceItem, { created: Timestamp }>;

  const dataItem: RestItemData = {} as RestItemData;

  if (isArticleItem(data)) {
    dataItem.articleUrl = data.articleUrl as string;
  } else if (isTwitterItem(data)) {
    dataItem.twitterName = data.twitterName as string;
  }

  return {
    id: item.id,
    title: data.title,
    content: data.content,
    created: data.created.toDate(),
    ...dataItem,
  };
};

export const convertQuerySnapshot = (querySnapshot: QuerySnapshot): Item[] =>
  querySnapshot.docs.map(convertQuerySnapshotItem);

export const itemConverter = {
  toFirestore(data: DocumentItem): firebase.firestore.DocumentData {
    return {
      ...data,
      userID: data.userID,
      type: data.type,
      created: serverTimestamp(),
    } as DocumentItem;
  },

  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions,
  ): DocumentItem {
    const data = snapshot.data(options) as Modify<ServiceItem, { created: Timestamp }>;

    const documentItem: DocumentItem = {
      id: snapshot.id,
      title: data.title,
      content: data.content,
      created: data.created.toDate(),
    };

    if (isArticleItem(data)) {
      documentItem.articleUrl = data.articleUrl;
    } else if (isTwitterItem(data)) {
      documentItem.twitterName = data.twitterName;
    }

    return documentItem;
  },
};
