// Firebase JS SDK configuration for VictorShare
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAThrwMYJ8xq7SqJgzOM30m5S9HkwHwGEs",
  authDomain: "victorshare.firebaseapp.com",
  projectId: "victorshare",
  storageBucket: "victorshare.firebasestorage.app",
  messagingSenderId: "267109953634",
  appId: "1:267109953634:web:5ce1efd7bc5d0d0081213b",
  measurementId: "G-8N2192DVQ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export default app;
