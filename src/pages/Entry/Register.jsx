import { Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { use, useContext, useEffect, useState } from 'react'
import Animated, { FlipInXUp, FlipOutXDown } from 'react-native-reanimated'
import styles from '../../styles/styles'
import Input from '../../components/Input'
import { LockKeyhole, Mail, UserCircle2 } from 'lucide-react-native'
import useFirebase, { createAccount } from '../../hooks/useFirebase'
import ModalContext from '../../contexts/ModalContext'
import { useNavigation } from '@react-navigation/native'
import Unchecked from "../../assets/form/unchecked.svg";
import Checked from "../../assets/form/checked.svg";
import LottieView from 'lottie-react-native'

import LoadingOverlay from '../../components/LoadingOverlay'
import TermsAndConditions from './TermsAndConditions'

const Register = ({set}) => {

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [isFormSatisfied, setIsFormSatisfied] = useState(false)
  const [isTermsChecked, setIsTermsChecked] = useState(false)
  const [isTermsOpen, setIsTermsOpen] = useState(false)

  // const { createAccount } = useFirebase();
  const { setModal } = useContext(ModalContext);
  const nav = useNavigation();
  const onSubmit = async () => {
    setIsFormDisabled(true)
    
    if(!validate()){
      return;
    }
    
    await createAccount({ username: form.username, email: form.email, password: form.password })
  }
  const validate = () => {
    if (form.username.trim() === "") {
      // ToastAndroid.show("Username Field is required.", ToastAndroid.SHORT);
      return false;
    }

    if (form.email.trim() === "") {
      // ToastAndroid.show("Email Field is required.", ToastAndroid.SHORT);
      return false;
    }

    if (form.password.trim() === "") {
      // ToastAndroid.show("Password Field is required.", ToastAndroid.SHORT);
      return false;
    }

    if (form.password.trim() !== form.confirmPassword.trim()) {
      // ToastAndroid.show("Passwords does not match", ToastAndroid.SHORT);
      return false;
    }
    return true;
  }
  useEffect(() => {
    setIsFormSatisfied(validate())
  },[form])

  return (
    <>
      {isFormDisabled && <LoadingOverlay text={"Registering..."} />}
      <TermsAndConditions
        onClose={() => setIsTermsOpen(false)}
        isOpen={isTermsOpen}
        checkbox={isTermsChecked}
        toggleCheckbox={() => setIsTermsChecked(!isTermsChecked)}
      />
      <Animated.View
        entering={FlipInXUp}
        exiting={FlipOutXDown}
        style={[styles.entryBackground, { marginVertical: 0, marginBottom: 8 }]}
      >
        <Text style={styles.entryTitle}>Sign Up</Text>
        <Text style={styles.entryBody}>
          Join NUMindify and start boosting your knowledge today
        </Text>
        <Input
          placeholder={"Username"}
          Icon={UserCircle2}
          onChangeText={(text) => setForm({ ...form, username: text })}
          value={form.username}
          style={{ marginTop: 24 }}
          disabled={isFormDisabled}
        />
        <Input
          placeholder={"Email"}
          Icon={Mail}
          onChangeText={(text) => setForm({ ...form, email: text })}
          value={form.email}
          disabled={isFormDisabled}
        />
        <Input
          placeholder={"Password"}
          secure={true}
          Icon={LockKeyhole}
          onChangeText={(text) => setForm({ ...form, password: text })}
          value={form.password}
          disabled={isFormDisabled}
        />
        <Input
          placeholder={"Confirm Password"}
          secure={true}
          Icon={LockKeyhole}
          onChangeText={(text) => setForm({ ...form, confirmPassword: text })}
          value={form.confirmPassword}
          disabled={isFormDisabled}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
            width: "90%",
          }}
        >
          <TouchableOpacity onPress={() => setIsTermsChecked(!isTermsChecked)}>
            {isTermsChecked ? <Checked /> : <Unchecked />}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsTermsOpen(true)}>
            <Text style={{ color: "white", fontSize: 12 }}>
              I accept and acknowledge the{" "}
              <Text style={textHighlight}>Data Privacy Consent</Text> and the{" "}
              <Text style={textHighlight}>Terms and Conditions</Text>
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          disabled={isFormDisabled || !isTermsChecked || !isFormSatisfied}
          onPress={() => {
            onSubmit().then(() => setIsFormDisabled(false));
          }}
          style={
            isFormDisabled || !isTermsChecked || !isFormSatisfied
              ? [
                  styles.buttonOpacity,
                  styles.button,
                  { backgroundColor: "gray" },
                ]
              : [styles.buttonOpacity, styles.button]
          }
        >
          <Text style={styles.buttonText}>Sign Up</Text>
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
          Sign in
        </Text>
      </Animated.View>
    </>
  );
}

export default Register

const textHighlight = {
  color: "#FDB813",
  fontWeight: 'bold'
};