import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDVUz6CAgHWKVDJNCfg6wNS-sco5ITC61E",
  authDomain: "petcare-c5849.firebaseapp.com",
  projectId: "petcare-c5849",
  storageBucket: "petcare-c5849.appspot.com",
  messagingSenderId: "681121451978",
  appId: "1:681121451978:web:a19a256ca3be7b6f174933",
  measurementId: "G-DKFHF4WCHZ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export { auth, db, storage, provider, analytics };
