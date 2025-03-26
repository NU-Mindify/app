import { useContext } from "react";
import AccountContext from "../contexts/AccountContext";
import { getDatabase, onValue, ref, set } from 'firebase/database'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const newAccount = (email, username) => {
  return {
    username,
    email,
    chat: [],
    progress: [0, 0, 0, 0, 0],
    avatar: 0,
  }
};

const db = getDatabase();
const useFirebase = () => {
  const { accountData, setAccountData } = useContext(AccountContext);

  const getUserData = async (userID) => {
   const userDataRef = ref(db, `users/${userID}`);
   onValue(userDataRef, (snapshot) => {
     const data = snapshot.val();
     setAccountData(data);
     console.log(data);
   });
  }

  const createAccount = ({email, username, password}, callback = () => {}) => {
    createUserWithEmailAndPassword(getAuth(), email, password)
    .then(userCredential => {
      const user = userCredential.user;

      set(ref(db, "users/" + user.uid), newAccount(email, username))
      .then(() => {
        callback();
      })
      .catch(err => {
        console.error(err);
      })

    })
    .catch(err => {
      console.error(err.code + err.message);
    })
    
  }

  console.log("Checks if useFirebase run");
  
  return { getUserData, createAccount };
}
export default useFirebase;

//** 
// Initializes Auth changes
// */
export const AuthHandler = () => {
  const nav = useNavigation();
  const {getUserData} = useFirebase()

  onAuthStateChanged(getAuth(), (user) => {
    console.log(user);
    if (user) {
      console.log(user);
      nav.replace("Home");
      getUserData(user.uid);
    } else {
      nav.replace("Get Started");
    }
  });
  return
}

export const SignOut = () => {
  signOut(getAuth())
}

console.log("Checks if run");
