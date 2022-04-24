import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import {
  updateProfile,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getStorage, ref, uploadString } from 'firebase/storage';
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  async function signup(username, email, password) {
    const response = await createUserWithEmailAndPassword(auth, email, password);
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
    const storageRef = ref(storage, `${currentUser.uid}/${imgID}`);
    const message = src.split(',')[1];
  
    try {
      await uploadString(storageRef, message, 'base64');
      const firestamp = Timestamp.now();
      
      const storageObject = {
        imageID: imgID,
        authorID: currentUser.uid,
        path: `${currentUser.uid}/${imgID}`,
        name: name,
        mode: mode,
        date: firestamp
      }

      await addDoc(collection(db, "images"), storageObject);
      console.log('image uploaded successfuly');
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
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
