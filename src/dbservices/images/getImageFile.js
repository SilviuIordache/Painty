import { getStorage, ref, getDownloadURL } from 'firebase/storage';

export async function getImageFile(path) {
  const storage = getStorage();
  try {
    const res = await getDownloadURL(ref(storage, path));
    return res;
  } catch (err) {
    console.log(err);
  }
}
