// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "ailms-94bb7.firebaseapp.com",
  projectId: "ailms-94bb7",
  storageBucket: "ailms-94bb7.firebasestorage.app",
  messagingSenderId: "446584681179",
  appId: "1:446584681179:web:b26bf786c367e299d752fe"
};
console.log("API KEY:", import.meta.env.VITE_FIREBASE_APIKEY);
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, provider}