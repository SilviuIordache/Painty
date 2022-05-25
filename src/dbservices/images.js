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
  startAt,
  limit,
  getDocs,
  doc,
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
    const q = await query(
      collection(db, 'images'),
      where('authorID', '==', userID),
      orderBy('date', 'desc'),
      // limit(3),
      // startAfter(2),
    );
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

  // function storeImagesToLocalStorage(images) {
  //   const storageObj = {
  //     images,
  //   };
  //   localStorage.setItem('paintyCache', JSON.stringify(storageObj));
  // }

  // function getImagesFromLocalStorage() {
  //   const storage = JSON.parse(localStorage.getItem('paintyCache'));
  //   const images = storage.images;
  //   return images;
  // }
  // const images = await getImagesFromLocalStorage();

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

    toast.success("Image deleted");
  } catch (err) {
    console.log(err);
    toast.error("Error deleting image. Please retry");
  }
}
