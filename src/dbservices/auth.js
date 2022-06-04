import { db } from '../firebase';
import { auth } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import parseLoginResponse from '../helpers/parseLoginResponse'

export async function register(username, email, password) {
  // add user to auth storage
  const res = await createUserWithEmailAndPassword(auth, email, password);

  // add other profile data to separate storage
  const profile = {
    uid: res.user.uid,
    displayName: username
  }
  await addDoc(collection(db, 'profiles'), profile);
}

export async function login(email, password) {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return parseLoginResponse(res.user)
  } catch (err) {
    throw err;
  }
}

export async function logout() {
  return auth.signOut();
}

export async function resetPassword(email) {
  return auth.sendPasswordResetEmail(email);
}
