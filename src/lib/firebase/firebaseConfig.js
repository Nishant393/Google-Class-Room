import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAtMiKqvifMRMUs6V08gyb675D3ZeHy3Q0",
  authDomain: "classroom-dfacd.firebaseapp.com",
  projectId: "classroom-dfacd",
  storageBucket: "classroom-dfacd.appspot.com",
  messagingSenderId: "820551673250",
  appId: "1:820551673250:web:51b1bd6fb8865d66d03efb",
  measurementId: "G-41Q420R4L5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore();
