import firebase from 'firebase/app';
import { Modify } from 'commonTypes';
import { isArticleItem, isTwitterItem } from 'utils/guards';
import { ServiceItem, DocumentItem } from '../servicesTypes';
import { serverTimestamp } from '../core';

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
    const data = snapshot.data(options) as Modify<
      ServiceItem,
      { created: firebase.firestore.Timestamp }
    >;

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
