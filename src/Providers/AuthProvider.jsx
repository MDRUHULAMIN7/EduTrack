import { createContext, useEffect, useState } from "react";

import app from "../Firebase/Firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,

  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";


// eslint-disable-next-line react-refresh/only-export-components
export  const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  const [user,setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  

  const googleSigin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };



  const updateuserprofile = (name, photo) => {
    setLoading(true);

    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
      .then(async () => {
        setLoading(false);
        await auth.currentUser.reload();
        setUser(auth.currentUser);
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
      });
  };

  const updateUser = (u) => {
    setUser(u);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  const passwordResetEmail = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
     

      if (currentUser) {
        setUser(currentUser);
    
        const userInfo = { email: currentUser.email };
        console.log(userInfo);
        
      } else {
        setUser(null);
        
      }
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, [auth]);
  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signInUser,
    logout,
    updateuserprofile,
    googleSigin,
    updateUser,
   
    passwordResetEmail,
    
   
  };




  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
