import { initializeApp } from "firebase/app";


import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAoJRJtGPFedI5B9Z3Rp1HxQVT4K8_hxhg",
  authDomain: "fir-65497.firebaseapp.com",
  projectId: "fir-65497",
  storageBucket: "fir-65497.appspot.com",
  messagingSenderId: "188669970078",
  appId: "1:188669970078:web:4039e17a0cc1c13f5cdd8f",
  measurementId: "G-TLKMFPSDQB"
};


const app = initializeApp (firebaseConfig);


const db = getFirestore(app);

export { db }