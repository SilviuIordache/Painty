import { db, auth } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export async function register(username, email, password) {
  try {
    // add user to auth storage
    const res = await createUserWithEmailAndPassword(auth, email, password);

    // add other profile data to separate storage
    const profile = {
      uid: res.user.uid,
      displayName: username,
    };
    await addDoc(collection(db, 'profiles'), profile);
  } catch (err) {
    throw err;
  }
}
