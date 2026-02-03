import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3mUZj0GIJUlJWq7uV5wy0u58wby_P_a8",
  authDomain: "neural-news-tower.firebaseapp.com",
  projectId: "neural-news-tower",
  storageBucket: "neural-news-tower.firebasestorage.app",
  messagingSenderId: "1008205669625",
  appId: "1:1008205669625:web:4e1e272b936a2e5c3e2e28",
  measurementId: "G-LGEHM7ZCH3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;
