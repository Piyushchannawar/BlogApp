// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-app-4d6be.firebaseapp.com",
  projectId: "blog-app-4d6be",
  storageBucket: "blog-app-4d6be.firebasestorage.app",
  messagingSenderId: "582494915077",
  appId: "1:582494915077:web:79fa51e7429d22a2d6aa6c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

