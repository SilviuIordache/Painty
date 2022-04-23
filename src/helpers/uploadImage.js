import { getStorage, ref, uploadString } from 'firebase/storage';

export default async function uploadImage(name, src, uid) {
  const storage = getStorage();
  const storageRef = ref(storage, `${uid}/${name}`);
  const message = src.split(',')[1];

  try {
    const res = await uploadString(storageRef, message, 'base64');
    console.log(res);
  } catch (err) {
    console.log(err)
  }
}
