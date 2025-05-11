import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';

const Timer = ({onZero, duration = 20}) => {
  const [seconds, setSeconds] = useState(duration);
  const [percentage, setPercentage] = useState(100)

  useEffect(() => {
    setPercentage(Math.floor((seconds / duration) * 100));
    if (seconds > 0) {
      console.log(percentage);
      // eslint-disable-next-line no-undef
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      // eslint-disable-next-line no-undef
      return () => clearInterval(interval); // Cleanup function to clear the interval
    }else{
      onZero();
    }
  }, [seconds]);
  return (
    <View
      style={{
        backgroundColor: "#3B3F2A",
        width: "90%",
        margin: "auto",
        height: 24,
        borderRadius:24,
        overflow:'hidden'
      }}
    >
      <LinearGradient colors={["#D0E796", "#7F9F30"]} style={{height:24, width:`${percentage}%`,}} start={{x:0, y:0}} end={{x:1,y:0}}>

      </LinearGradient>
    </View>
  );
}

export default Timer