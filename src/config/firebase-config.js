import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVaTPZ7Z1ZTRndxWMrbG109SSnTZdnKzc",
  authDomain: "picstudio-ad8f7.firebaseapp.com",
  projectId: "picstudio-ad8f7",
  storageBucket: "picstudio-ad8f7.appspot.com",
  messagingSenderId: "923689967978",
  appId: "1:923689967978:web:7cfc0ecbfab0bc1703c513",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
