import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default async function downloadImage() {
  const storage = getStorage();

  try {
    const res = await getDownloadURL(ref(storage, 'folderName/myFileName'));
    return res;
  } catch (err) {
    console.log(err)
  }
}