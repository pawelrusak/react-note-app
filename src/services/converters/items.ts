import firebase from 'firebase/app';
import { isArticleItem, isTwitterItem } from 'utils/guards';
import { DocumentItem, FirestoreDocumentItem } from '../servicesTypes';
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
