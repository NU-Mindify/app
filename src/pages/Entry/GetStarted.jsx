import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { BounceIn, FadeIn, FadeOut } from 'react-native-reanimated';
import MindifyLogo from "../../assets/Logo.png";
import AppBackground from "../../components/AppBackground";
import { printStorage } from '../../contexts/useAccount';
import styles from '../../styles/styles';
import Login from './Login';
import Register from './Register';

export default function GetStarted() {
  const [state, setState] = useState("get started");

  return (
    <Animated.View
      entering={FadeIn.duration(1000)}
      exiting={FadeOut}
      style={{ flex: 1 }}
    >
      <AppBackground>
        <View style={{ alignItems: "center",  padding: 24, paddingTop:12, height: '100%' }}>
          <Animated.Image
            entering={BounceIn}
            source={MindifyLogo}
            resizeMode="contain"
            style={{ width: 400, height: 200 }}
          />
          {state === "login" && <Login set={setState} />}
          {state === "get started" && <GetStartedButton set={setState} />}
          {state === "register" && <Register set={setState} />}
        </View>
      </AppBackground>
    </Animated.View>
  );
}


const GetStartedButton = ({set}) => {
  
  return (
    <TouchableOpacity
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
    </TouchableOpacity>
  );};



