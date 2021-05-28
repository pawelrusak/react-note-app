/* eslint-disable @typescript-eslint/restrict-template-expressions */
/**
 * Firebase config objects.
 * @see {@link https://firebase.google.com/docs/projects/learn-more#config-files-objects}
 */
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_DEVELOPMENT_API_KEY,
  authDomain: `${process.env.REACT_APP_FIREBASE_DEVELOPMENT_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.REACT_APP_FIREBASE_DEVELOPMENT_PROJECT_ID}.firebaseio.com`,
  projectId: `${process.env.REACT_APP_FIREBASE_DEVELOPMENT_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_FIREBASE_DEVELOPMENT_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.REACT_APP_FIREBASE_DEVELOPMENT_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_DEVELOPMENT_APP_ID,
};

export default config;
