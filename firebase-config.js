// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaTXDSMS-mjDKZsP02LicREP2-kJ4dAzc",
  authDomain: "petcare-aaa04.firebaseapp.com",
  projectId: "petcare-aaa04",
  storageBucket: "petcare-aaa04.appspot.com",
  messagingSenderId: "250530019278",
  appId: "1:250530019278:web:b53614e6f9846e0a661d9f",
  measurementId: "G-40J5295EDG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);