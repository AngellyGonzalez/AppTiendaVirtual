import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAh4ImpfbigZLVxk_F7OkrLQo-oxe-NdXY",
  authDomain: "tiendavirtualsofia-fc649.firebaseapp.com",
  projectId: "tiendavirtualsofia-fc649",
  storageBucket: "tiendavirtualsofia-fc649.firebasestorage.app",
  messagingSenderId: "122940575184",
  appId: "1:122940575184:web:751f010b103519f20a3dd5",
  measurementId: "G-9CPCKXXYDL"
};


const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);