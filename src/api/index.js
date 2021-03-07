import { auth } from './firebase';

export const authenticateUser = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);
