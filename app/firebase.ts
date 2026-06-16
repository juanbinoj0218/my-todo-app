import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyChy_RKq5JBEzcUKAwjGk8UBW4oAdVwToU",
  authDomain: "intern-todo-app-dd82d.firebaseapp.com",
  projectId: "intern-todo-app-dd82d",
  storageBucket: "intern-todo-app-dd82d.firebasestorage.app",
  messagingSenderId: "231683357444",
  appId: "1:231683537444:web:d649e0a854b7fc65b4f6b1"
};

// Initialize Firebase safely for Next.js environments
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export { signInWithPopup, signOut };