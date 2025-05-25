import { useContext } from "react";
import AccountContext from "../contexts/AccountContext";
import { getDatabase, onValue, ref, set } from 'firebase/database'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { OAuthProvider } from "firebase/auth";
import axios from "axios";
import { firebaseAuth } from "../firebase";
import { ToastAndroid } from "react-native";


export const loginAuth = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    getAuth(),
    email,
    password
  );
  const user = userCredential.user;
};
export const createAccount = async (
  { email, username, password, branch = "moa" },
  callback = () => {}
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      getAuth(),
      email,
      password
    );
    const user = userCredential.user;
    console.log(user);
    console.log("toInput", {
      branch,
      username,
      email,
      uid: user.uid,
    });
    
    const response = await axios.post(
      process.env.EXPO_PUBLIC_URL + "/createUser",
      {
        branch,
        username,
        email,
        uid: user.uid,
      }
    );
    console.log(response.data);

    callback();
  } catch (err) {
    console.error("Creating Account", err.message);
    const errorCode = err.code;
    const errorMessage = err.message;
    let customErrorMessage = "";
    console.log(errorCode);
    
    switch (errorCode) {
      case "auth/email-already-in-use":
        customErrorMessage = "This email address is already in use.";
        break;
      case "auth/invalid-email":
        customErrorMessage = "Please enter a valid email address.";
        break;
      case "auth/weak-password":
        customErrorMessage =
          "The password is too weak. Please choose a stronger password.";
        break;
      case "auth/network-request-failed":
        customErrorMessage =
          "There was a network error. Please check your internet connection and try again.";
        break;
      default:
        customErrorMessage =
          "An unexpected error occurred. Please try again later.";
        console.error("Firebase Auth Error:", err);
    }
    ToastAndroid.show(customErrorMessage, ToastAndroid.LONG);
  }
};
const useFirebase = () => {
  const { accountData, setAccountData, setProgressData } = useContext(AccountContext);
  const nav = useNavigation()


  const getUserData = async (userID) => {
  try {
    const { data } = await axios.get(
      `${process.env.EXPO_PUBLIC_URL}/getUser/${userID}`,
      { timeout: 10000 }
    );
    const { data:progressData } = await axios.get(
      `${process.env.EXPO_PUBLIC_URL}/getProgress/${data._id}`,
      { timeout: 10000 }
    );
    console.log("mongoUserData", userID, data, progressData);
    
    if (!data || !progressData) {
      throw new Error("Cannot find user data!");
    }
    setAccountData( data )
    setProgressData( progressData )
    nav.replace("Home");
  } catch (error) {
    console.error("getUserData", error.message);
    console.error(error.response.data);
    ToastAndroid.show(`Can't get user data: ${error.message}`)
  }
  }

  const sendVerifyEmail = async () => {
    try {
      await getAuth().currentUser.reload();
      if(getAuth().currentUser.emailVerified){
        return;
      }
      await sendEmailVerification(getAuth().currentUser);
      alert("Sucessfull! Please check your email to email verification.");
    } catch (error) {
      console.error(error);
      alert(error.code);
    }
  };
  console.log("Checks if useFirebase run");

  const sendResetPasswordEmail = (email) => {
    const auth = getAuth();
  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert("The Reset Password Link has been sent to your email!")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
    }
  
  return { getUserData, sendVerifyEmail, sendResetPasswordEmail };
}
export default useFirebase;

//** 
// Initializes Auth changes
// */
export const AuthHandler = () => {
  const nav = useNavigation();
  const {getUserData} = useFirebase()

  onAuthStateChanged(firebaseAuth, (user) => {
    if (!user) {
      nav.replace("Get Started");
      return;
    }
    console.log(user.uid);
    if (!user.emailVerified){
      nav.replace("Verify")
      return;
    }
    getUserData(user.uid);
  });
  return
}

export const SignOut = async () => {
  await signOut(getAuth())
}

console.log("Checks if run");