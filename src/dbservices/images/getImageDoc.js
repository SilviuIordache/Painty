import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export async function getImageDoc(imageID) {
  const docRef = doc(db, 'images', imageID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }
}
