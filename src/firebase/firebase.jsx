import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjKc9y_gfrGtvQXBvxxmnduGHBwo70uPI",
  authDomain: "notes-app-feace.firebaseapp.com",
  projectId: "notes-app-feace",
  storageBucket: "notes-app-feace.firebasestorage.app",
  messagingSenderId: "1070876760318",
  appId: "1:1070876760318:web:59fd96a14a28c4aae72daf",
  measurementId: "G-DRW4BQZNW5"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);