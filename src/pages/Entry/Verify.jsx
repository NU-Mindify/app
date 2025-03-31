import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppBackground from '../../components/AppBackground'
import Button from '../../components/Button'
import useFirebase, {SignOut} from '../../hooks/useFirebase'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { getAuth } from 'firebase/auth'
import { firebaseAuth } from '../../firebase'

const Verify = () => {
  const nav = useNavigation();

  useEffect(() => {
    const a = setInterval(() => {
      console.log("Checked");
      
      if (!firebaseAuth.currentUser?.emailVerified) {
        return firebaseAuth.currentUser?.reload().then(() => {
          if (firebaseAuth.currentUser?.emailVerified) {
            console.log("Email successfully verified.");
            nav.replace("Home");
          }
        });
      } else {
        clearInterval(a);
        return;
      }
    }, 10000);
    return () => clearInterval(a);
  }, [])

  const { sendVerifyEmail } = useFirebase();

  return (
    <AppBackground>
      <Text>Verify</Text>
      <View style={{ gap: 2 }}>
        <Button onPress={sendVerifyEmail} text={"Send Verification"} />
        <Button onPress={SignOut} text={"Sign Out"} />
      </View>
    </AppBackground>
  );
}

export default Verify