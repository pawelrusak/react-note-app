import firebase from 'firebase/app';
import { isArticleItem, isTwitterItem } from '~/utils/guards';
import type { DocumentItem, NewDocumentItem, FirestoreDocumentItem } from '../servicesTypes';
import { serverTimestamp } from '../core';

export const itemConverter = {
  toFirestore(data: NewDocumentItem): firebase.firestore.DocumentData {
    return {
      ...data,
      userID: data.userID,
      type: data.type,
      created: serverTimestamp(),
    };
  },

  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions,
  ): DocumentItem {
    const data: FirestoreDocumentItem = snapshot.data(options) as FirestoreDocumentItem;

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
