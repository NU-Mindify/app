import { LockKeyhole, UserCircle2 } from "lucide-react-native";
import { useContext, useState } from "react";
import Animated, { FlipInXUp, FlipOutXDown } from "react-native-reanimated";
import Input from "../../components/Input";
import { Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import AccountContext from "../../contexts/AccountContext";
import styles from "../../styles/styles";
import { useNavigation } from "@react-navigation/native";
import useFirebase, { loginAuth } from "../../hooks/useFirebase";

const Login = ({ set }) => {
  const [username, setUsername] = useState("fjsalles.04@gmail.com");
  const [password, setPassword] = useState("123123");
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  

  const nav = useNavigation();

  const onSubmit = () => {
    setIsFormDisabled(true)
    if(username.trim() === ""){
      ToastAndroid.show("Email Field is required.", ToastAndroid.SHORT);
      setIsFormDisabled(false)
      return;
    }
    if(password.trim() === ""){
      ToastAndroid.show("Password Field is required.", ToastAndroid.SHORT);
      setIsFormDisabled(false)
      return;
    }

    loginAuth(username, password)
    .catch(err => {
      console.log(err);
      ToastAndroid.show(`${err.message}`, ToastAndroid.SHORT);
      setIsFormDisabled(false)
    })
  }
  return (
    <>
      <Animated.View
        entering={FlipInXUp}
        exiting={FlipOutXDown}
        style={styles.entryBackground}
      >
        <Text style={styles.entryTitle}>Log In</Text>
        <Text style={styles.entryBody}>Login your account to get started.</Text>
        <Input
          placeholder="Email"
          Icon={UserCircle2}
          onChangeText={(text) => setUsername(text)}
          value={username}
          disabled={isFormDisabled}
        />
        <Input
          placeholder={"Password"}
          secure={true}
          Icon={LockKeyhole}
          onChangeText={(text) => setPassword(text)}
          value={password}
          disabled={isFormDisabled}
        />
        <TouchableOpacity onPress={onSubmit} style={styles.buttonOpacity} disabled={isFormDisabled}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Log In</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        entering={FlipInXUp}
        exiting={FlipOutXDown}
        style={[
          styles.entryBackground,
          { flexDirection: "row", gap: 0, marginTop: "auto" },
        ]}
      >
        <Text style={styles.entryBody}>Don't have an account yet? </Text>
        <Text
          style={[styles.entryBody, { color: "#FFC916", fontWeight: "bold" }]}
          onPress={() => {
            set("register");
          }}
        >
          Register
        </Text>
      </Animated.View>
    </>
  );
};

export default Login;
