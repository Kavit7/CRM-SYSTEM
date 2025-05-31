// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your Firebase config from the console
const firebaseConfig = {
  apiKey: "AIzaSyDm0ks4JgdmyvXhgjhZ0khsyDr4iPn1xd4",
  authDomain: "webdevelopment-506e3.firebaseapp.com",
  projectId: "webdevelopment-506e3",
  storageBucket: "webdevelopment-506e3.firebasestorage.app",
  messagingSenderId: "714653582005",
  appId: "1:714653582005:web:235a4fc98b93e262de74fc",
  measurementId: "G-1HHSZYL1HR"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
