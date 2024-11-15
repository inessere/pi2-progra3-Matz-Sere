// Import the functions you need from the SDKs you need
import app from "firebase/app"
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBeXVUMFzCUtYRXk5zJP0-9IdrrtHIwxmA",
  authDomain: "pi2-matz-sere.firebaseapp.com",
  projectId: "pi2-matz-sere",
  storageBucket: "pi2-matz-sere.firebasestorage.app",
  messagingSenderId: "861726939948",
  appId: "1:861726939948:web:ea918aa69ad1832d3c6a89",
 
};

// Initialize Firebase
app.initializeApp(firebaseConfig);
export const auth = firebase.auth()
export const db = app.firestore()
export const storage =app.storage()