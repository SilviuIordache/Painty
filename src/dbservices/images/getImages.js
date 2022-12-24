import {
  query,
  collection,
  where,
  doc,
  getDoc,
  getDocs,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore';
import { db } from '../../firebase';

export async function getImages(payload) {
  // constraints array pipeline
  let constraints = [];
  constraints.push(orderBy('date', 'desc'));

  if (payload?.latest)
    constraints.push(limit(4));
  else
    constraints.push(limit(process.env.REACT_APP_IMAGE_BATCH_SIZE));

  // user specific query
  if (payload?.userId)
    constraints.push(where('authorID', '==', payload.userId));

  // cursor pagination-like query
  if (payload?.lastImageId) {
    const docRef = doc(db, 'images', payload.lastImageId);
    const cursor = await getDoc(docRef);

    if (cursor) constraints.push(startAfter(cursor));
  }

  let q = query(collection(db, 'images'), ...constraints);

  const documentSnapshots = await getDocs(q);
  if (documentSnapshots.docs.length === 0) {
    return {
      images: [],
    };
  }

  const newLastImageId =
    documentSnapshots.docs[documentSnapshots.docs.length - 1].id;

  let images = [];
  documentSnapshots.forEach((doc) => {
    const obj = doc.data();
    obj.id = doc.id;
    obj.date = obj.date.toDate().toString();
    images.push(obj);
  });

  return {
    images,
    lastImageId: newLastImageId,
    lastBatchLength: documentSnapshots.docs.length,
  };
}
