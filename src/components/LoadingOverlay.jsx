import { View, Text, Platform } from 'react-native'
import React from 'react'
import { modalStyles } from '../styles/modalStyles'
import LottieView from 'lottie-react-native';
import loading from "../anim/loading_circle.json";
import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut } from 'react-native-reanimated';

const LoadingOverlay = ({text}) => {
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={modalStyles.modalBackground}
    >
      <Animated.View
        entering={ZoomIn}
        exiting={ZoomOut}
        style={{
          backgroundColor: "white",
          padding: 24,
          borderRadius: 12,
          width: 200,
          height: 200,
          justifyContent: "space-around",
          alignItems: "center",
          boxShadow: "2px 8px 24px black",
        }}
      >
        <LottieView
          style={{
            width: "100%",
            height: "70%",
            margin: "auto",
            marginTop: 0,
            padding: 0,
            transform: Platform.OS === "ios" ? [{ scale: 1 }] : [{ scale: 1.6 }],
          }}
          speed={2}
          resizeMode="center"
          source={loading}
          autoPlay
          loop
        />
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          {text || "Loading"}
        </Text>
      </Animated.View>
    </Animated.View>
  );
}

export default LoadingOverlay