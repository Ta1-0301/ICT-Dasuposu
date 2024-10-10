import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhjroYDINyVKnojiMnFgZDS-r2pkS17ZQ",
  authDomain: "procon-2024-1feac.firebaseapp.com",
  databaseURL: "https://procon-2024-1feac-default-rtdb.firebaseio.com",
  projectId: "procon-2024-1feac",
  storageBucket: "procon-2024-1feac.appspot.com",
  messagingSenderId: "1063940012584",
  appId: "1:1063940012584:web:7b3e64c7dc47529a25931d",
  measurementId: "G-XEQ921VP5P"
};


isSupported().then((supported) => {
  if (supported) {
    const analytics = getAnalytics(app);
  } else {
    console.log("Analytics not supported in this environment");
  }
});

// Initialize Firebase
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Initialize Firebase Authentication
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore
const db = getFirestore(app);
const storage = getStorage(app);

// Initialize Realtime Database
const rtdb = getDatabase(app);
const database = getDatabase(app);

// Initialize Analytics
const analytics = getAnalytics(app);

// Initialize database 
initializeApp(firebaseConfig);

// Create references to Firestore collections
const usersRef = collection(db, 'users');
const roomRef = collection(db, 'rooms');

export { app, db, rtdb, analytics, usersRef, roomRef, storage};