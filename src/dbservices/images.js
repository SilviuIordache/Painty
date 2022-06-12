import { toast } from 'react-toastify';

import {
  getStorage,
  ref,
  uploadString,
  deleteObject,
  getDownloadURL,
} from 'firebase/storage';
import {
  query,
  collection,
  addDoc,
  Timestamp,
  where,
  // startAt,
  // limit,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  orderBy,
} from 'firebase/firestore';
import { db } from '../firebase';
import { v4 as uuidv4 } from 'uuid';

export async function getImageDoc(imageID) {
  const docRef = doc(db, 'images', imageID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }
}

export async function getImageFile(path) {
  const storage = getStorage();
  try {
    const res = await getDownloadURL(ref(storage, path));
    return res;
  } catch (err) {
    console.log(err);
  }
}

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

export async function uploadImage({ name, src, mode, userID }) {
  const storage = getStorage();
  const imgID = uuidv4();
  const imageStoragePath = `${userID}/${imgID}`;
  const storageRef = ref(storage, imageStoragePath);
  const message = src.split(',')[1];

  try {
    // upload file
    const res = await uploadString(storageRef, message, 'base64');
    const storedSize = res.metadata.size;
    const firestamp = Timestamp.now();

    const storageObject = {
      imageID: imgID,
      authorID: userID,
      path: `${userID}/${imgID}`,
      name: name,
      mode: mode,
      date: firestamp,
      size: storedSize,
    };

    // upload doc with reference to file
    await addDoc(collection(db, 'images'), storageObject);
  } catch (err) {
    console.log(err);
  }
}

export async function deleteImage(docID, imagePath) {
  // delete DB doc
  try {
    await deleteDoc(doc(db, 'images', docID));
  } catch (err) {
    console.log(err);
  }

  // delete storage file
  try {
    const storage = getStorage();
    const desertRef = ref(storage, `${imagePath}`);
    await deleteObject(desertRef);

    toast.success('Image deleted');
  } catch (err) {
    console.log(err);
    toast.error('Error deleting image. Please retry');
  }
}

export async function toggleLike(docID, userID) {
  const docRef = doc(db, 'images', docID);

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
}
