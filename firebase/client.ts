// Import the functions you need from the SDKs you need
import {
  initializeApp,
  getApp,
  getApps,
} from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtu7wrEJpKCmfKCwojULlwDqoaynEG4Jk",
  authDomain: "prepwise-64e79.firebaseapp.com",
  projectId: "prepwise-64e79",
  storageBucket: "prepwise-64e79.firebasestorage.app",
  messagingSenderId: "557825534024",
  appId: "1:557825534024:web:ff3246b07dcbb31f18907d",
  measurementId: "G-5ZXNNYG93C",
};

// Initialize Firebase
const app = !getApps.length
  ? initializeApp(firebaseConfig)
  : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
