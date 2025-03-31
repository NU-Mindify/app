import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import AccountContext from "./AccountContext";
import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ModalContext from "./ModalContext";
import axios from "axios";

// const useAccount = () => {
//   const {setAccountData} = useContext(AccountContext);
//   const {setModal} = useContext(ModalContext)
//   const nav = useNavigation();
  
//   const createAccount = async ({username, email, password}) => {
//     const newAccount = {
//       id: guidGenerator(),username, email, password, chat:[], progress: [0,0,0,0,0], avatar: 0
//     }
//     try {
//       const accountsStorage = (await AsyncStorage.getItem("accounts")) || "[]";
//       const jsonAccounts = JSON.parse(accountsStorage);

//       let emailDuplicate = false, usernameDuplicate = false;
//       jsonAccounts.map(account => {
//         if(username === account.username){
//           usernameDuplicate = true
//         }else if(email === account.email){
//           emailDuplicate = true
//         }
//       })
//       if(usernameDuplicate){
//         ToastAndroid.show("Username already exist.", ToastAndroid.SHORT);
//         return;
//       }else if (emailDuplicate) {
//         ToastAndroid.show("Email already registered.", ToastAndroid.SHORT);
//         return;
//       }
//       const newAccountList = [...jsonAccounts, newAccount];
//       await AsyncStorage.setItem("accounts", JSON.stringify(newAccountList))
//       setAccountData(newAccount)
//       setModal({
//         subtitle: "Registered",
//         body:"Do you want to set up your account?",
//         primaryFn:() => {
//           nav.replace("Home")
//           nav.navigate("Edit Profile")
//           setModal(null)
//         },
//         secondaryFn: () => {
//           nav.replace("Home");
//           setModal(null)
//         },
//         mode:"LevelSelect"
//       })
//       console.log(newAccountList);
      
//     } catch (error) {
//       alert(error)
//     }

//   }
  // const login = async ({username, password}) => {
  //   try {
  //     const accountsStorage = await AsyncStorage.getItem("accounts");
  //     const jsonAccounts = JSON.parse(accountsStorage);
  //     let existing = false;
  //     jsonAccounts.map((account) => {
  //       if (username === account.username) {
  //         existing = true;
  //         if(password === account.password){
  //           setAccountData(account);
  //           nav.replace("Home");
  //         }else{
  //           ToastAndroid.show("Wrong Password", ToastAndroid.SHORT);
  //           return;
  //         }
  //       }
  //     });
  //     if (!existing) {
  //       ToastAndroid.show("User does not exist", ToastAndroid.SHORT);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     alert(error);
  //   }
  // }
  
//   const guidGenerator = () => {
//       let S4 = function(){
//           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
//       };
//       return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
//   }

//   return { createAccount };
// }
// export default useAccount;

export const printStorage = async () => {
   try {
    const accountsStorage = await AsyncStorage.getItem("accounts");
    console.log(accountsStorage)
   }catch(error){
    console.error(error);
    alert(error);
   }
}

// export const updateStorage = async (data) => {
//   if(!data) return;
//   try {
//     const accountsStorage = await AsyncStorage.getItem("accounts");
//     const jsonAccounts = JSON.parse(accountsStorage);
//     const newAccountList = jsonAccounts.map((account) => {
//       if (data && data.id === account.id) {
//         return data;
//       } else {
//         return account;
//       }
//     });

//     await AsyncStorage.setItem("accounts", JSON.stringify(newAccountList));
//   } catch (error) {
//     console.error(error);
//     alert(error);
//   }
// };

export const ResetButton = () => {
  const {accountData, setAccountData} = useContext(AccountContext);
  const onClick = () => {
    AsyncStorage.clear();
  };
  return (
    <View
      style={{
        position: "absolute",
        opacity: 0.2,
        zIndex: 5,
        flexDirection: "row",
        gap: 4,
      }}
    >
      <TouchableOpacity style={adminStyles.button} onPress={onClick}>
        <Text style={adminStyles.buttonText}>Reset Accounts</Text>
      </TouchableOpacity>
      {accountData && (
        <TouchableOpacity
          style={adminStyles.button}
          onPress={() =>
            setAccountData({ ...accountData, progress: [0, 0, 0, 0, 0] })
          }
        >
          <Text style={adminStyles.buttonText}>Clear Progress</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={adminStyles.button} onPress={async () => {
        
        try {
          // const json = await axios.post("http://192.168.1.9:8080/api/addTerm", 
          // {
          //   word: "Access",
          //   meaning:
          //     "A subject or object's ability to use manipulate, modify, or affect another subject or object.",
          // });
          const json = await axios.patch(
            "http://192.168.1.9:8080/api/progressCategory",
            {
              category: "abnormal",
              mode: "classic",
              user_id: "w5WgP0ai2OV9nzhHbKr7eDBkRbe2",
            }
          );
          console.log(json.data); 
        } catch (error) {
          console.error(error.message);
          console.error(error.response.data);
        }
        
      }}>
        <Text style={adminStyles.buttonText}>Fetch Data</Text>
      </TouchableOpacity>
    </View>
  );
};

const adminStyles = StyleSheet.create({
  button: {
    padding: 4,
    borderWidth: 2,
    borderColor: "white",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 8,
  },
});