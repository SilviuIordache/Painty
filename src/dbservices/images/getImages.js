import { query, collection, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';

export async function getImages(userID) {
  async function getImagesFromDB() {
    // needs indexes created in firebase to work

    let q;
    if (userID) {
      q = query(
        collection(db, 'images'),
        where('authorID', '==', userID),
        orderBy('date', 'desc')
      );
    } else {
      q = query(collection(db, 'images'), orderBy('date', 'desc'));
    }

    const querySnapshot = await getDocs(q);

    let images = [];
    querySnapshot.forEach((doc) => {
      const obj = doc.data();
      obj.id = doc.id;
      obj.date = obj.date.toDate().toString();
      images.push(obj);
    });
    return images;
  }
  const images = await getImagesFromDB();
  return images;
}
