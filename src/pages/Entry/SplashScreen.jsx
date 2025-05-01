import { View, Text } from 'react-native'
import React from 'react'
import AppBackground from '../../components/AppBackground'
import Animated from 'react-native-reanimated'
import MindifyLogo from "../../assets/Logo.png";
import { AuthHandler } from '../../hooks/useFirebase';
import LottieView from 'lottie-react-native';
import plane from '../../anim/plane.json'
import loading from '../../anim/loading.json'

const SplashScreen = () => {
  AuthHandler()
  console.log("splash");
  
  return (
    <AppBackground>
      <Animated.Image
        source={MindifyLogo}
        resizeMode="contain"
        style={{ width: 400, height: 200, margin: "auto", marginBottom: 0 }}
      />
      <LottieView
        style={{
          width: 400,
          height: 200,
          margin: "auto",
          marginTop: 0,
        }}
        source={loading}
        autoPlay
        loop
      />
    </AppBackground>
  );
}

export default SplashScreen