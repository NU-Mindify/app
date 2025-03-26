import { View, Text } from 'react-native'
import React from 'react'
import AppBackground from '../../components/AppBackground'
import Animated from 'react-native-reanimated'
import MindifyLogo from "../../assets/Logo.png";
import { AuthHandler } from '../../hooks/useFirebase';

const SplashScreen = () => {
  AuthHandler()
  return (
    <AppBackground>
      <Animated.Image
        source={MindifyLogo}
        resizeMode="contain"
        style={{ width: 400, height: 200, margin:'auto' }}
      />
    </AppBackground>
  )
}

export default SplashScreen