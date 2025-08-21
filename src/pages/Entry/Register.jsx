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

const Register = ({set, setTerms}) => {
  const { setModal } = useContext(ModalContext);
  const nav = useNavigation();
  const { createAccount } = useFirebase();
  const [form, setForm] = useState({
    username: "",
    first_name:"",
    last_name:"",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [isFormSatisfied, setIsFormSatisfied] = useState(false)
  
  
  const [formErrors, setFormErrors] = useState({});
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;

  const [currentField, setCurrentField] = useState(null)

  const onSubmit = async () => {
    setIsFormDisabled(true)
    if(!validate()){
      return;
    }
    await createAccount({ username: form.username, email: form.email, password: form.password, first_name: form.first_name, last_name: form.last_name })
  }

  const validate = () => {
    let isValid = true;
    let errors = {};

    if (form.username.trim().length < 6) {
      errors.username = "Username must be at least 6 characters";
      isValid = false;
    }

    if (form.first_name.trim().length < 2) {
      errors.first_name = "First name must be at least 2 characters";
      isValid = false;
    }

    if (form.last_name.trim().length < 2) {
      errors.last_name = "Last name must be at least 2 characters";
      isValid = false;
    }

    if (!form.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Enter a valid email";
      isValid = false;
    }

    if (!form.password.trim()) {
      errors.password = "Password is required";
      isValid = false;
    } else if (form.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

      if (!passwordRegex.test(form.password)) {
        errors.password =
          "Password must contain at least one uppercase letter and special character.";
        isValid = false;
      }

    if (form.password !== form.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    
    setFormErrors(errors);

    return isValid;
  };

  useEffect(() => {
    setIsFormSatisfied(validate())
  },[form])

  return (
    <>
      {isFormDisabled && <LoadingOverlay text={"Registering..."} />}

      <Animated.View
        entering={FlipInXUp}
        exiting={FlipOutXDown}
        style={[styles.entryBackground, { marginVertical: 0, marginBottom: 8 }]}
      >
        <Text style={styles.entryTitle}>Sign Up</Text>
        <Text style={styles.entryBody}>
          Join NUMindify and start boosting your knowledge today!
        </Text>
        <Input
          label={"Username"}
          Icon={UserCircle2}
          onChangeText={(text) => setForm({ ...form, username: text })}
          value={form.username}
          style={{ marginTop: 12 }}
          disabled={isFormDisabled}
          returnKeyType="next"
          currentFocus={currentField === 0}
          onSubmitEditing={() => setCurrentField(1)}
          condition={(text) => text.length >= 6}
          errorText={formErrors.username}
        />
        <Input
          label={"First Name"}
          Icon={UserCircle2}
          onChangeText={(text) => setForm({ ...form, first_name: text })}
          value={form.first_name}
          disabled={isFormDisabled}
          returnKeyType="next"
          currentFocus={currentField === 1}
          onSubmitEditing={() => setCurrentField(2)}
          condition={(text) => text.length >= 2}
          errorText={formErrors.first_name}
        />
        <Input
          label={"Last Name"}
          Icon={UserCircle2}
          onChangeText={(text) => setForm({ ...form, last_name: text })}
          value={form.last_name}
          disabled={isFormDisabled}
          returnKeyType="next"
          currentFocus={currentField === 2}
          onSubmitEditing={() => setCurrentField(3)}
          condition={(text) => text.length >= 2}
          errorText={formErrors.last_name}
        />
        <Input
          label={"Email"}
          Icon={Mail}
          onChangeText={(text) => setForm({ ...form, email: text })}
          value={form.email}
          disabled={isFormDisabled}
          returnKeyType="next"
          onSubmitEditing={() => setCurrentField(4)}
          currentFocus={currentField === 3}
          condition={(text) => (
            // text.endsWith("@students.nu-moa.edu.ph"
            /\S+@\S+\.\S+/.test(text)
            )}
          errorText={formErrors.email} //for trial purposes kaya ko i-uncomment
        />
        <Input
          label={"Password"}
          secure={true}
          Icon={LockKeyhole}
          onChangeText={(text) => setForm({ ...form, password: text })}
          value={form.password}
          disabled={isFormDisabled}
          currentFocus={currentField === 3}
          returnKeyType="next"
          onSubmitEditing={() => setCurrentField(4)}
          condition={(text) =>
            passwordRegex.test(text) &&
            form.password.trim() &&
            form.password.length > 6
          }
          errorText={formErrors.password}
        />
        <Input
          label={"Confirm Password"}
          secure={true}
          Icon={LockKeyhole}
          onChangeText={(text) => setForm({ ...form, confirmPassword: text })}
          value={form.confirmPassword}
          disabled={isFormDisabled}
          currentFocus={currentField === 4}
          returnKeyType="done"
          condition={(text) => text === form.password}
          errorText={formErrors.confirmPassword}
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
          <TouchableOpacity
            onPress={() => setTerms.setIsTermsChecked(!setTerms.isTermsChecked)}
          >
            {setTerms.isTermsChecked ? <Checked /> : <Unchecked />}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTerms.setTermsOpen(true)}>
            <Text style={{ color: "white", fontSize: 12 }}>
              I accept and acknowledge the{" "}
              <Text style={textHighlight}>Data Privacy Consent</Text> and the{" "}
              <Text style={textHighlight}>Terms and Conditions</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          disabled={isFormDisabled}
          onPress={() => {
            if (
              form.username.trim() === "" ||
              form.first_name?.trim() === "" ||
              form.last_name?.trim() === "" ||
              form.email.trim() === "" ||
              form.password.trim() === "" ||
              form.confirmPassword.trim() === ""
            ) {
              alert(
                "Please fill in all required fields",
              )
              return;
            }

            if (!setTerms.isTermsChecked) {
              alert(
                "Please accept Terms and Conditions and Data Privacy Consent to continue.",
              )
                
              return;
            }

            if (!isFormSatisfied) {
              alert(
                "Please double check your input fields.",
              )
              return;
            }

            onSubmit().then(() => setIsFormDisabled(false));
          }}
          style={
            isFormDisabled || !setTerms.isTermsChecked || !isFormSatisfied
              ? [
                  styles.buttonOpacity,
                  styles.button,
                  // { backgroundColor: "gray" },
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