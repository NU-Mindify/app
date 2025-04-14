import { Text, ToastAndroid, TouchableOpacity } from 'react-native'
import React, { use, useContext, useState } from 'react'
import Animated, { FlipInXUp, FlipOutXDown } from 'react-native-reanimated'
import styles from '../../styles/styles'
import Input from '../../components/Input'
import { LockKeyhole, Mail, UserCircle2 } from 'lucide-react-native'
import useFirebase, { createAccount } from '../../hooks/useFirebase'
import ModalContext from '../../contexts/ModalContext'
import { useNavigation } from '@react-navigation/native'

const Register = ({set}) => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  // const { createAccount } = useFirebase();
  const { setModal } = useContext(ModalContext);
  const nav = useNavigation();
  const onSubmit = async () => {
    setIsFormDisabled(true)
    if(username.trim() === ""){
      ToastAndroid.show("Username Field is required.", ToastAndroid.SHORT)
      return;
    }
    
    if(email.trim() === ""){
      ToastAndroid.show("Email Field is required.", ToastAndroid.SHORT)
      return;
    }
    
    if (password.trim() === "") {
      ToastAndroid.show("Password Field is required.", ToastAndroid.SHORT);
      return;
    }
    
    if(password.trim() !== confirmPassword.trim()){
      ToastAndroid.show("Passwords does not match", ToastAndroid.SHORT)
      return;
    }
    
    await createAccount({ username, email, password })
  }

  return (
    <>
      <Animated.View
        entering={FlipInXUp}
        exiting={FlipOutXDown}
        style={[styles.entryBackground]}
      >
        <Text style={styles.entryTitle}>Register</Text>
        <Text style={styles.entryBody}>
          Join NUMindify and start boosting your knowledge today
        </Text>
        <Input
          placeholder={"Username"}
          Icon={UserCircle2}
          onChangeText={(text) => setUsername(text)}
          value={username}
          style={{ marginTop: 24 }}
          disabled={isFormDisabled}
        />
        <Input
          placeholder={"Email"}
          Icon={Mail}
          onChangeText={(text) => setEmail(text)}
          value={email}
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
        <Input
          placeholder={"Confirm Password"}
          secure={true}
          Icon={LockKeyhole}
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          disabled={isFormDisabled}
        />
        <TouchableOpacity
          disabled={isFormDisabled}
          onPress={() => {
            onSubmit().then(() => setIsFormDisabled(false));
          }}
          style={isFormDisabled ? [styles.buttonOpacity, {backgroundColor: 'gray'}] : styles.buttonOpacity}
        >
          <Animated.View style={styles.button}>
            <Text style={styles.buttonText}>{isFormDisabled ? "..." : "Register"}</Text>
          </Animated.View>
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
        <Text style={styles.entryBody}>Already have an account? </Text>
        <Text
          style={[styles.entryBody, { color: "#FFC916", fontWeight: "bold" }]}
          onPress={() => {
            set("login");
          }}
        >
          Log In
        </Text>
      </Animated.View>
    </>
  );
}

export default Register