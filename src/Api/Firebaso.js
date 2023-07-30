// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyL7Gwvc6FVzgQf2QH6IHyKvwrcFrdhJA",
  authDomain: "todo-lista-410ab.firebaseapp.com",
  projectId: "todo-lista-410ab",
  storageBucket: "todo-lista-410ab.appspot.com",
  messagingSenderId: "680691316746",
  appId: "1:680691316746:web:8106601611d008399ec7f3",
  measurementId: "G-2ZV65Q3193"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const cusAuth = getAuth(app)
export const cusDb = getFirestore(app)
export const googleProvider  = new GoogleAuthProvider()