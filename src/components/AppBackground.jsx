import { ImageBackground } from "react-native";
import React from "react";
import MindifyBackground from "../assets/bg.png";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import blur from "../anim/data.json";


const AppBackground = ({ children, style = {}, source, viewStyle = {}}) => {
  return (
    <ImageBackground
      source={source || MindifyBackground}
      style={[{ flex: 1 }, style]}
      resizeMode="cover"
      resizeMethod="scale"
    >
      <SafeAreaView style={[{ flex: 1, width: "100%" }, viewStyle]}>
        <LottieView
          style={{
            display: source ? "none" : "flex",
            position: "absolute",
            width: 720,
            height: 1280,
            margin: "auto",
            zIndex: -1,
            marginTop: 0,
            opacity: 0.4,
          }}
          source={blur}
          autoPlay
          loop
        />

        {children}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default AppBackground;
