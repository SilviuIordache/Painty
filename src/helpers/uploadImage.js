import { getStorage, ref, uploadString } from 'firebase/storage';

export default async function uploadImage(name, src) {
  const storage = getStorage();
  const storageRef = ref(storage, `images/${name}`);
  const message = src.split(',')[1];

  try {
    const res = await uploadString(storageRef, message, 'base64');
    console.log(res);
  } catch (err) {
    console.log(err)
  }
}
