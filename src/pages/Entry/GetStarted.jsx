import React, { useEffect, useState } from 'react';
import { Keyboard, Text, View } from 'react-native';
import Animated, { BounceIn, FadeIn, FadeOut } from 'react-native-reanimated';
import MindifyLogo from "../../assets/Logo.png";
import AppBackground from "../../components/AppBackground";
import { printStorage } from '../../contexts/useAccount';
import styles from '../../styles/styles';
import Login from './Login';
import Register from './Register';
import { Pressable, ScrollView } from 'react-native-gesture-handler';

export default function GetStarted() {
  const [state, setState] = useState("get started");
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

  return (
    <Animated.View
      entering={FadeIn.duration(1000)}
      exiting={FadeOut}
      style={{ flex: 1 }}
    >
      <AppBackground>
        <ScrollView contentContainerStyle={{ alignItems: "center",  padding: 24, paddingTop:12, minHeight:'100%' }}>
          {!isKeyboardVisible && 
            <Animated.Image
            entering={BounceIn}
            exiting={FadeOut}
            source={MindifyLogo}
            resizeMode="contain"
            style={{ width: 280, height: 200 }}
            />
          }
          {state === "login" && <Login set={setState} />}
          {state === "get started" && <GetStartedButton set={setState} />}
          {state === "register" && <Register set={setState} />}
        </ScrollView>
      </AppBackground>
    </Animated.View>
  );
}


const GetStartedButton = ({set}) => {
  
  return (
    <Pressable
          style={[
            styles.buttonOpacity,
            { marginTop: "auto" },
          ]}
          onPress={() => {
            printStorage()
            set("login");
          }}
        >
          <Animated.View
            style={[styles.button]}
            entering={BounceIn.springify().delay(300)}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </Animated.View>
    </Pressable>
  );};



