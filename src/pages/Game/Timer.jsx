import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import GameContext from '../../contexts/GameContext';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const Timer = ({ onZero, duration = 20, currentNumber }) => {
  const { isMastery, gameColor } = useContext(GameContext);
  const [seconds, setSeconds] = useState(duration);
  const progress = useSharedValue(1);
  const [percentage, setPercentage] = useState(100);

  useEffect(() => {
    setPercentage(Math.floor((seconds / duration) * 100));
    if (seconds >= 0) {
      console.log(percentage);
      // eslint-disable-next-line no-undef
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      // eslint-disable-next-line no-undef
      return () => clearInterval(interval); // Cleanup function to clear the interval
    } else {
      progress.value = withTiming(0, { duration: 300, easing: Easing.linear });
      onZero();
      if (isMastery) {
        setSeconds(duration);
      }
    }
  }, [seconds]);

  useEffect(() => {
    // Animate the progress bar when the timer starts or seconds change
    if (seconds >= 0) {
      progress.value = withTiming(seconds / duration, {
        duration: 1000, // Match the interval
        easing: Easing.linear,
      });
    }
  }, [seconds, duration]);

  useEffect(() => {
    setSeconds(duration)
  }, [currentNumber]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
    };
  });
  return (
    <View
      style={{
        backgroundColor: "#3B3F2A",
        width: "90%",
        margin: "auto",
        height: 24,
        borderRadius: 24,
      }}
    >
      <Animated.View
        style={[
          {
            height: 24,
            borderRadius: 24,
            boxShadow: `2px 8px 24px ${"#7F9F30"}`,
          },
          animatedStyle,
        ]}
      >
        <LinearGradient
          colors={gameColor.timer}
          style={{ height: 24, borderRadius: 24 }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        ></LinearGradient>
      </Animated.View>
    </View>
  );
};

export default Timer