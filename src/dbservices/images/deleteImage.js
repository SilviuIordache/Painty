import { toast } from 'react-toastify';
import { deleteImageFromStore } from '../../redux/features/imagesSlice.js';
import { store } from '../../redux/store';

import {
  getStorage,
  ref,
  deleteObject,
} from 'firebase/storage';
import {
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../../firebase';

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

  // also delete from the redux store
  store.dispatch(deleteImageFromStore(docID))
}