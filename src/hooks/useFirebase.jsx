import { useContext } from "react";
import AccountContext from "../contexts/AccountContext";
import { getDatabase, onValue, ref, set } from 'firebase/database'
import { createUserWithEmailAndPassword, getAuth, getIdToken, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { OAuthProvider } from "firebase/auth";
import axios from "axios";
import { firebaseAuth } from "../firebase";
import { ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const loginAuth = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    getAuth(),
    email,
    password
  );
  const user = userCredential.user;
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
      console.log("check uid", data);

      const { data: progressData } = await axios.get(
        `${process.env.EXPO_PUBLIC_URL}/getProgress/${data._id}`,
        { timeout: 10000 }
      );
      console.log("mongoUserData", userID, data, progressData);

      if (!data || !progressData) {
        throw new Error("Cannot find user data!");
      }
      setAccountData(data)
      setProgressData(progressData)
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
      if (getAuth().currentUser.emailVerified) {
        return;
      }
      await sendEmailVerification(getAuth().currentUser);
      alert("Email Verification Sent! Please check your email to verify your account.");
    } catch (error) {
      console.error(error);
      alert(error.code);
    }
  };

  const sendResetPasswordEmail = (email) => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("The Reset Password Link has been sent to your email!")
        if(nav.canGoBack()){
          nav.goBack()
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  const createAccount = async (
    { email, username, password, first_name, last_name, branch = "moa" },
    callback = () => { }
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
          first_name,
          last_name,
          uid: user.uid,
        }
      );
      console.log(response.data);
      setAccountData(response.data)
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

  return { getUserData, sendVerifyEmail, sendResetPasswordEmail, createAccount };
}
export default useFirebase;

//** 
// Initializes Auth changes
// */
export const AuthHandler = () => {
  const nav = useNavigation();
  const { getUserData } = useFirebase()

  onAuthStateChanged(firebaseAuth, async (user) => {
    try {
      if (!user) {
        nav.replace("Get Started");
        return;
      }
      const idToken = await firebaseAuth.currentUser.getIdToken();
      await storeData("token", idToken);
      if (!user.emailVerified) {
        nav.replace("Verify")
        return;
      }
      getUserData(user.uid);
      
    } catch (error) {
      console.error("statechageError",error);
      
    }
  });
  return
}
const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error("Storing Data", key, value);
  }
}
const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Deleting Data", key);
  }
}

export const SignOut = async () => {
  await removeData('token');
  await signOut(getAuth())
}