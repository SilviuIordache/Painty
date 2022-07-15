import { auth } from '../../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

export async function resetPassword(email) {
  try {
    const res = await sendPasswordResetEmail(auth, email);
    return res;
  } catch (err) {
    throw err;
  }
}
