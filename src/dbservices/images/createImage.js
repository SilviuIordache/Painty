import { getStorage, ref, uploadString } from 'firebase/storage';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

import { db } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

export async function createImage({ name, src, mode, userID }) {
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

    if (mode === 'practice') {
      toast.success('Image saved');
    }
  } catch (err) {
    console.log(err);
    if (mode === 'practice') {
      toast.error('Error saving image. Please retry');
    }
  }
}
