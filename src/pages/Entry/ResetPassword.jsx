import { View, Text, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppBackground from '../../components/AppBackground'
import Button from '../../components/Button'
import useFirebase, {SignOut} from '../../hooks/useFirebase'
import LottieView from 'lottie-react-native'
import plane from "../../anim/plane.json";
import Animated, { BounceIn } from 'react-native-reanimated'
import MindifyLogo from "../../assets/Logo.png";
import { useNavigation } from '@react-navigation/native'
import Input from '../../components/Input'
import { Mail } from 'lucide-react-native'

const ResetPassword = () => {

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  
    useEffect(() => {
      const showSubscription = Keyboard.addListener(
        "keyboardDidShow",
        handleKeyboardShow
      );
      const hideSubscription = Keyboard.addListener(
        "keyboardDidHide",
        handleKeyboardHide
      );
  
      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }, []);
  
    const handleKeyboardShow = (event) => {
      setIsKeyboardVisible(true);
    };
  
    const handleKeyboardHide = (event) => {
      setIsKeyboardVisible(false);
    };

  const nav = useNavigation()
  const [email, setEmail] = useState("")
  const { sendResetPasswordEmail } = useFirebase();

  return (
    <AppBackground>
      {!isKeyboardVisible &&
      <Animated.Image
        source={MindifyLogo}
        resizeMode="contain"
        style={{ width: 400, height: 200 }}
      />
      }
      <View style={{ gap: 2 }}>
        <View
          style={{
            margin: 16,
            overflow: "hidden",
            borderColor: "black",
            borderWidth: 1,
            backgroundColor:'rgba(0, 0, 0, 0.4)',
            borderRadius: 12,
            padding:12
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
            Enter your email address below, and we'll send you a secure link to reset your password.
          </Text>
          <Input value={email} onChangeText={text => setEmail(text)} placeholder={"e.g juan@national-u.edu.ph"} Icon={Mail} style={{paddingHorizontal:12}}/>
        </View>
        <View style={{padding: 16, gap:4}}>
          <Button onPress={() => {sendResetPasswordEmail(email)}} text={"Reset Password"} />
          <Button onPress={() => nav.goBack()} style={{backgroundColor: 'rgb(255, 65, 65)'}} text={"Back"} />
        </View>
      </View>
    </AppBackground>
  );
}

export default ResetPassword