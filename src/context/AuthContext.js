  import { createContext, useContext, useEffect, useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { auth, provider, db, storage } from '../firebaseConfig';
  import { signInWithEmailAndPassword,createUserWithEmailAndPassword, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
  import { doc, setDoc, getDoc, addDoc, collection } from 'firebase/firestore';
  import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
              setCurrentUser({ ...user, ...userDoc.data() });
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
      const { email, password, role, name, location, phone, petName, petAge, petBirthDate, petBreed, petGender, petWeight, petColor, petImage, vetImage } = userDetails;

      try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const user = result.user;
        const userRef = doc(db, "users", user.uid);

        if (role === 'pet-owner' && petImage) {
          const storageRef = ref(storage, `petImages/${user.uid}`);
          await uploadBytes(storageRef, petImage);
          const petImageUrl = await getDownloadURL(storageRef);
          await setDoc(userRef, {
            role, email, petName, petAge, petBirthDate, petBreed, petGender, petWeight, petColor, petImageUrl
          });
        } else if (role === 'vet' && vetImage) {
          const storageRef = ref(storage, `vetImages/${user.uid}`);
          await uploadBytes(storageRef, vetImage);
          const vetImageUrl = await getDownloadURL(storageRef);
          await setDoc(userRef, {
            role, email, name, location, phone, vetImageUrl
          });
        } else {
          await setDoc(userRef, { role, email, name, location, phone });
        }

        setCurrentUser({ ...user, role });
      } catch (error) {
        console.error("Error during sign-up:", error);
        throw error;
      }
    };

    const googlelogin = async () => {
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
    
    const login = async (email, password) => {
      try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const user = result.user;
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setCurrentUser({ ...user, role: userDoc.data().role });
        } else {
          setCurrentUser(user);
        }
      } catch (error) {
        console.error("Error during login:", error);
        throw error;
      }
    };

    const logout = async () => {
      await firebaseSignOut(auth);
      const auth2 = window.gapi.auth2?.getAuthInstance();
      if (auth2 != null) {
        auth2.signOut().then(() => {
          auth2.disconnect();
          setCurrentUser(null);
          navigate('/'); // Navigate to the login page
          window.location.reload(); // Reload the web app
        }).catch((error) => {
          console.error("Error during Google sign-out:", error);
          setCurrentUser(null);
          navigate('/'); // Navigate to the login page anyway
          window.location.reload(); // Reload the web app
        });
      } else {
        setCurrentUser(null);
        navigate('/'); // Navigate to the login page
        window.location.reload(); // Reload the web app
      }
    };

    const addAvailableAppointment = async (vetId, vetName, vetLocation, date, time) => {
      try {
        await addDoc(collection(db, 'availableAppointments'), {
          vetId, vetName, vetLocation, date, time
        });
      } catch (error) {
        console.error("Error adding available appointment:", error);
      }
    };

    const bookAppointment = async (userId, vetId, date, time) => {
      try {
        await addDoc(collection(db, 'appointments'), {
          userId, vetId, date, time
        });
      } catch (error) {
        console.error("Error booking appointment:", error);
      }
    };

    return (
      <AuthContext.Provider value={{ currentUser, googlelogin, logout, signUp, login, addAvailableAppointment, bookAppointment }}>
        {!loading && children}
      </AuthContext.Provider>
    );
  };
