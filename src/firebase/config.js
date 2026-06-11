import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJYI71PW6gRE_87MYMkp5CjWmJvr3CiIE",
  authDomain: "talentotech-ee5be.firebaseapp.com",
  projectId: "talentotech-ee5be",
  storageBucket: "talentotech-ee5be.firebasestorage.app",
  messagingSenderId: "117867693878",
  appId: "1:117867693878:web:31b510a27b006119f91597",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
