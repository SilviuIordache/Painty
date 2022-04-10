import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase'
import { updateProfile } from "firebase/auth";


const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true)

  function signup(username, email, password) {
    console.log(username, email, password)
    return auth.createUserWithEmailAndPassword(email, password);
    // updateProfile(auth.currentUser, {
    //   displayName: username
    // })
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  useEffect(() => {
    // returns a method that can be called for clean-up
    const unsubscribe = auth.onAuthStateChanged( user => {
      setCurrentUser(user);
      setLoading(false)
    });

    // clean-up
    return unsubscribe;
  }, [])

  
  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword
  }
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
