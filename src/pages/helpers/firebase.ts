// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmeYHe52wy5ADBsN1LOPKraJf3FN5WSwQ",
  authDomain: "politicheckr.firebaseapp.com",
  projectId: "politicheckr",
  storageBucket: "politicheckr.appspot.com",
  messagingSenderId: "639135458893",
  appId: "1:639135458893:web:b400d640f634fb3f3a9e04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// login handlers
const auth = getAuth(app);
const firestore = getFirestore(app);

export {app, auth, firestore}