import { initializeApp } from 'firebase/app';
import AsyncStorage from "@react-native-async-storage/async-storage";
// eslint-disable-next-line import/named
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API,
  authDomain: "nu-mindify.firebaseapp.com",
  projectId: "nu-mindify",
  databaseURL: process.env.EXPO_PUBLIC_DB,
  storageBucket: "nu-mindify.firebasestorage.app",
  messagingSenderId: "342146446671",
  appId: process.env.EXPO_PUBLIC_APPID,
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
})

export const firebaseAuth = getAuth(app)