import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

import parseLoginResponse from '../../utils/parseLoginResponse';

export async function login(email, password) {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return parseLoginResponse(res.user);
  } catch (err) {
    throw err;
  }
}
