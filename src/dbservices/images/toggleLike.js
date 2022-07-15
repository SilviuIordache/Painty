import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export async function toggleLike(docID, userID) {
  const docRef = doc(db, 'images', docID);

  try {
    // get existing likes
    let likes = [];
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const docData = docSnap.data();
      if (docData.likes) {
        likes = [...docData.likes];
      }
    }
  
    // check for user in the list of likes
    if (likes.includes(userID)) {
      // remove user from the list
      const index = likes.indexOf(userID);
      likes.splice(index, 1);
    } else {
      // add user to the list
      likes.push(userID);
    }
  
    await updateDoc(docRef, {
      likes,
    });
  } catch (err) {
    console.log(err)
  }
}
