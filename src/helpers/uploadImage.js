// import { getStorage, ref, uploadString } from 'firebase/storage';
// import { v4 as uuidv4 } from 'uuid';

// export default async function uploadImage(name, src, uid) {
//   const storage = getStorage();
//   const imageID = uuidv4();
//   const storageRef = ref(storage, `${uid}/${imageID}`);
//   const message = src.split(',')[1];

//   try {
//     const res = await uploadString(storageRef, message, 'base64');

//     console.log(res);
//     console.log('image uploaded successfuly');
//   } catch (err) {
//     console.log(err)
//   }
// }
