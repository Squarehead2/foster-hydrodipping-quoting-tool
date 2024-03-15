// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  updateEmail,
} from "firebase/auth";
import "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY.toString(),
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: "foster-hydro-dipping-cf805",
  storageBucket: "foster-hydro-dipping-cf805.appspot.com",
  messagingSenderId: "1003192700488",
  appId: "1:1003192700488:web:0f8c42cebac9feab15127d",
  measurementId: "G-FTC1JTSVWY",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get auth instance
const auth = getAuth(app);

// Export auth, GoogleAuthProvider, and signInWithPopup
export {
  auth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  updateEmail,
};
export default app;
