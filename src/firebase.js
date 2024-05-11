// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
 
const firebaseConfig = {
  apiKey: "AIzaSyA6_pq4vPWOIoFOzRxJ9f_ULUYScEUJNaw",
  authDomain: "finalsport-43d3f.firebaseapp.com",
  projectId: "finalsport-43d3f",
  storageBucket: "finalsport-43d3f.appspot.com",
  messagingSenderId: "598822890574",
  appId: "1:598822890574:web:0d644669d5548033f6e71f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);