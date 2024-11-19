import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBEFd2Py0it0Q5u6F8voueZCzoStD-Kq8E",
  authDomain: "currency-exchange-alert.firebaseapp.com",
  projectId: "currency-exchange-alert",
  storageBucket: "currency-exchange-alert.firebasestorage.app",
  messagingSenderId: "254696276606",
  appId: "1:254696276606:web:ca259fde18d812f3fc0e2f",
  measurementId: "G-MWL3LB4F6P"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)