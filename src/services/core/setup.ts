/* eslint-disable import/no-duplicates */
import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import config from './config';

firebase.initializeApp(config);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const {
  FieldValue: { serverTimestamp },
} = firebase.firestore;
