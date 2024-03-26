// Import the core Firebase functionalities and initialize the app
import { initializeApp } from "firebase/app";

// Import the necessary authentication functionalities
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
  sendEmailVerification,
} from "firebase/auth";

// Import the storage functionality for file uploads
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
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

// Get an instance of the Firebase Authentication service
const auth = getAuth(app);

// Get an instance of the Firebase Storage service
const storage = getStorage(app);

// Export all the necessary instances and functions for authentication, storage, and firestore
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
  sendEmailVerification,
  storage,

};

export default app;
