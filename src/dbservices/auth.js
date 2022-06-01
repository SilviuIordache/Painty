import { auth } from '../firebase';
import {
  updateProfile,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import parseLoginResponse from '../helpers/parseLoginResponse'

export async function register(username, email, password) {
  const response = await createUserWithEmailAndPassword(auth, email, password);
  return updateProfile(response.user, {
    displayName: username,
  });
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
