// src/context/AuthProviderWithNavigate.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, provider, db, storage } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
import { setPersistence, browserLocalPersistence } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);


export const AuthProviderWithNavigate = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setCurrentUser({ ...user, role: userDoc.data().role });
          } else {
            setCurrentUser(user);
          }
        } catch (error) {
          console.error("Error fetching user document:", error);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (userDetails) => {
    const { email, password, role, name, location, phone, petName, petAge, petImage } = userDetails;

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;
      const userRef = doc(db, "users", user.uid);
      console.log("User created in auth:", user);

      if (role === 'pet-owner' && petImage) {
        const storageRef = ref(storage, `petImages/${user.uid}`);
        await uploadBytes(storageRef, petImage);
        const petImageUrl = await getDownloadURL(storageRef);
        await setDoc(userRef, { role, email, petName, petAge, petImageUrl });
        console.log("Pet image uploaded and user data saved to Firestore");
      } else {
        await setDoc(userRef, { role, email, name, location, phone });
        console.log("User data saved to Firestore");
      }

      setCurrentUser({ ...user, role });
    } catch (error) {
      console.error("Error during sign-up:", error);
      throw error;  // Rethrow the error so it can be caught in SignUpPage
    }
  };

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        setCurrentUser({ ...user, role: userDoc.data().role });
      } else {
        setCurrentUser(user);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const logout = async () => {
    await firebaseSignOut(auth);
    const auth2 = window.gapi.auth2.getAuthInstance();
    if (auth2 != null) {
      auth2.signOut().then(() => {
        auth2.disconnect();
        setCurrentUser(null);
        navigate('/');
      });
    } else {
      setCurrentUser(null);
      navigate('/');
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, signUp }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
