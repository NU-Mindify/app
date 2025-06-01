import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppBackground from '../../components/AppBackground'
import Button from '../../components/Button'
import useFirebase, {SignOut} from '../../hooks/useFirebase'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { getAuth } from 'firebase/auth'
import { firebaseAuth } from '../../firebase'
import LottieView from 'lottie-react-native'
import plane from "../../anim/plane.json";
import Animated, { BounceIn } from 'react-native-reanimated'
import MindifyLogo from "../../assets/Logo.png";

const Verify = () => {
  const nav = useNavigation();

  useEffect(() => {
    // eslint-disable-next-line no-undef
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
        // eslint-disable-next-line no-undef
        clearInterval(a);
        return;
      }
    }, 10000);
    // eslint-disable-next-line no-undef
    return () => clearInterval(a);
  }, [])

  const { sendVerifyEmail } = useFirebase();

  return (
    <AppBackground>
      <Animated.Image
        entering={BounceIn}
        source={MindifyLogo}
        resizeMode="contain"
        style={{ width: 400, height: 200 }}
      />
      <View style={{ gap: 2 }}>
        <View
          style={{
            margin: 16,
            overflow: "hidden",
            borderColor: "black",
            borderWidth: 1,
            backgroundColor:'rgba(0, 0, 0, 0.4)',
            borderRadius: 12
          }}
        >
          <LottieView
            style={{
              width: 300,
              height: 160,
              marginHorizontal: 'auto',
              // backgroundColor:'red'
            }}
            source={plane}
            autoPlay
            loop
          />
          <Text style={{textAlign:'center', padding:8, paddingBottom: 24, color: 'white'}}>
            Check your email to verify your email address.
          </Text>
        </View>
        <View style={{padding: 16, gap:4}}>
          <Button onPress={sendVerifyEmail} text={"Send Verification"} />
          <Button style={{backgroundColor: 'rgb(255, 65, 65)'}} onPress={SignOut} text={"Sign Out"} />
        </View>
      </View>
    </AppBackground>
  );
}

export default Verify