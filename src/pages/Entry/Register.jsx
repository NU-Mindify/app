import { Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { use, useContext, useEffect, useRef, useState } from 'react'
import Animated, { FlipInXUp, FlipOutXDown } from 'react-native-reanimated'
import styles from '../../styles/styles'
import Input from '../../components/Input'
import { LockKeyhole, Mail, UserCircle2 } from 'lucide-react-native'
import useFirebase from '../../hooks/useFirebase'
import ModalContext from '../../contexts/ModalContext'
import { useNavigation } from '@react-navigation/native'
import Unchecked from "../../assets/form/unchecked.svg";
import Checked from "../../assets/form/checked.svg";
import LottieView from 'lottie-react-native'

import LoadingOverlay from '../../components/LoadingOverlay'
import TermsAndConditions from './TermsAndConditions'

const Register = ({set}) => {
  const { setModal } = useContext(ModalContext);
  const nav = useNavigation();
  const { createAccount } = useFirebase();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [isFormSatisfied, setIsFormSatisfied] = useState(false)
  const [isTermsChecked, setIsTermsChecked] = useState(false)
  const [isTermsOpen, setIsTermsOpen] = useState(false)

  const [currentField, setCurrentField] = useState(null)

  const onSubmit = async () => {
    setIsFormDisabled(true)
    if(!validate()){
      return;
    }
    await createAccount({ username: form.username, email: form.email, password: form.password, first_name: form.first_name, last_name: form.last_name })
  }
  const validate = () => {
    return (
      form.username.trim() !== "" && 
      form.email.trim() !== "" &&
      form.password.trim() !== "" &&
      form.password.trim() === form.confirmPassword.trim()
    )
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
          Join NUMindify and start boosting your knowledge today {"\n"}(Student ID, Branch, middle to be added)
        </Text>
        <Input
          placeholder={"Username"}
          Icon={UserCircle2}
          onChangeText={(text) => setForm({ ...form, username: text })}
          value={form.username}
          style={{ marginTop: 24 }}
          disabled={isFormDisabled}
          returnKeyType="next"
          currentFocus={currentField === 0}
          onSubmitEditing={() => setCurrentField(1)}
          condition={(text) => text.length >= 6}
          errorText={"Provide at least 6 characters"}
        />
        <Input
          placeholder={"First Name"}
          Icon={UserCircle2}
          onChangeText={(text) => setForm({ ...form, first_name: text })}
          value={form.first_name}
          disabled={isFormDisabled}
          returnKeyType="next"
          currentFocus={currentField === 1}
          onSubmitEditing={() => setCurrentField(2)}
          condition={(text) => text.length >= 2}
          errorText={"Provide at least 2 characters"}
        />
        <Input
          placeholder={"Last Name"}
          Icon={UserCircle2}
          onChangeText={(text) => setForm({ ...form, last_name: text })}
          value={form.last_name}
          disabled={isFormDisabled}
          returnKeyType="next"
          currentFocus={currentField === 2}
          onSubmitEditing={() => setCurrentField(3)}
          condition={(text) => text.length >= 2}
          errorText={"Provide at least 2 characters"}
        />
        <Input
          placeholder={"Email"}
          Icon={Mail}
          onChangeText={(text) => setForm({ ...form, email: text })}
          value={form.email}
          disabled={isFormDisabled}
          returnKeyType="next"
          onSubmitEditing={() => setCurrentField(4)}
          currentFocus={currentField === 3}
          condition={(text) => text.endsWith("@students.nu-moa.edu.ph")}
          errorText={"Email is not a valid NU MOA Student email"}
        />
        <Input
          placeholder={"Password"}
          secure={true}
          Icon={LockKeyhole}
          onChangeText={(text) => setForm({ ...form, password: text })}
          value={form.password}
          disabled={isFormDisabled}
          currentFocus={currentField === 3}
          returnKeyType="next"
          onSubmitEditing={() => setCurrentField(4)}
          condition={(text) => text.length >= 6}
          errorText={"Provide at least 6 characters"}
        />
        <Input
          placeholder={"Confirm Password"}
          secure={true}
          Icon={LockKeyhole}
          onChangeText={(text) => setForm({ ...form, confirmPassword: text })}
          value={form.confirmPassword}
          disabled={isFormDisabled}
          currentFocus={currentField === 4}
          returnKeyType="done"
          condition={(text) => text === form.password}
          errorText={"Password does not match"}
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