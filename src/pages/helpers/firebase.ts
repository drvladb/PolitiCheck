// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Auth, User, getAuth, reload } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmeYHe52wy5ADBsN1LOPKraJf3FN5WSwQ",
  authDomain: "politicheckr.firebaseapp.com",
  projectId: "politicheckr",
  storageBucket: "politicheckr.appspot.com",
  messagingSenderId: "639135458893",
  appId: "1:639135458893:web:b400d640f634fb3f3a9e04",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// login handlers
const auth = getAuth(app);

export type AuthState = {
  isLoggedIn: boolean
  auth: Auth
  user?: User
}

const oGetAuth = async (): Promise<AuthState> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(["user"], (d) => { 
      // reload(d["user"])
      if (d["user"]) {
        resolve({
          isLoggedIn: true,
          user: d["user"],
          auth
        })
      } else {
        resolve({
          isLoggedIn: false,
          auth
        })
      }
    })
  })
}

const firestore = getFirestore(app);

export { app, oGetAuth as getAuth, firestore };
