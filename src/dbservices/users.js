import { query, where, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export async function getUserProfile(uid) {
  const q = query(collection(db, 'profiles'), where('uid', '==', uid));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs[0].data();
}
