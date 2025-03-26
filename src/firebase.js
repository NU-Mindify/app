import { initializeApp } from 'firebase/app';
// eslint-disable-next-line import/named
import { initializeAuth, getReactNativePersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

// Optionally import the services that you want to use
// import {...} from 'firebase/auth';
// import {...} from 'firebase/database';
// import {...} from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAyAUp7hUpDHdCXYLinMmKgks_xG5R5_xg",
  authDomain: "nu-mindify.firebaseapp.com",
  projectId: "nu-mindify",
  databaseURL: "https://nu-mindify-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "nu-mindify.firebasestorage.app",
  messagingSenderId: "342146446671",
  appId: "1:342146446671:web:13259f6e3ea1cd0406413a"
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const createAccount = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
  .then(userCredential => {
    const user = userCredential.user
    console.log(user);
  })
  .catch(error => {
    const errorCode = error.code
    const errorMessage = error.message;
    console.error(error);
  })
}
export const loginAuth = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
  .then(userCredential => {
    const user = userCredential.user
    console.log(userCredential);
  })
  .catch(error => {
    console.error(error);
  })
}
