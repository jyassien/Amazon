import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDEAW-Ks7GDIwXEwBOAHOR0EHJ8--3P3tU",
  authDomain: "amazn-shop.firebaseapp.com",
  projectId: "amazn-shop",
  storageBucket: "amazn-shop.appspot.com",
  messagingSenderId: "440316553582",
  appId: "1:440316553582:web:232537c3f34222e910397f",
  measurementId: "G-PNZMYXV94K",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };