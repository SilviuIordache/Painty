import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import {
  updateProfile,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { deleteObject, getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import {
  query,
  where,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc,
  Timestamp,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  async function signup(username, email, password) {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return updateProfile(response.user, {
      displayName: username,
    });
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  async function uploadImage(name, src, mode) {
    const storage = getStorage();
    const imgID = uuidv4();
    const imageStoragePath = `${currentUser.uid}/${imgID}`
    const storageRef = ref(storage, imageStoragePath);
    const message = src.split(',')[1];

    try {
      // upload file
      const res = await uploadString(storageRef, message, 'base64');
      const storedSize = res.metadata.size;
      const firestamp = Timestamp.now();

      const storageObject = {
        imageID: imgID,
        authorID: currentUser.uid,
        path: `${currentUser.uid}/${imgID}`,
        name: name,
        mode: mode,
        date: firestamp,
        size: storedSize
      };

      // upload doc with reference to file
      await addDoc(collection(db, 'images'), storageObject);
      console.log('image uploaded successfuly');
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteImage(docID, imagePath) {
    // delete DB doc
    try {
      await deleteDoc(doc(db, "images", docID));
    } catch (err) {
      console.log(err);
    }

    // delete storage file
    try {
      const storage = getStorage();
      const desertRef = ref(storage, `${imagePath}`);
      await deleteObject(desertRef);
    } catch (err) {
      console.log(err);
    }
  }

  async function getImages() {
    async function getImagesFromDB() {
      const q = await query(
        collection(db, 'images'),
        where('authorID', '==', currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
  
      let images = [];
      querySnapshot.forEach((doc) => {
        const obj = doc.data();
        // also add the db id to the object
        obj.id = doc.id;
        images.push(obj);
      });
      // store images to local storage
      storeImagesToLocalStorage(images)

      return images;
    }

    function storeImagesToLocalStorage(images) {
      const storageObj = {
        images
      }
      localStorage.setItem('paintyCache', JSON.stringify(storageObj))
    }

    function getImagesFromLocalStorage() {
      const storage = JSON.parse(localStorage.getItem('paintyCache'));
      const images = storage.images;

      return images;
    }
    const images = await getImagesFromDB();
    // const images = await getImagesFromLocalStorage();
    return images;
  }

  async function getImage(id) {
    const docRef = doc(db, "images", id)
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }
  }

  async function downloadImage(path) {
    const storage = getStorage();
    try {
      const res = await getDownloadURL(ref(storage, path));
      return res;
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    // returns a method that can be called for clean-up
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // clean-up
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    uploadImage,
    deleteImage,
    getImages,
    getImage,
    downloadImage
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
