import { View, Text, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Info } from 'lucide-react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import Button from './Button'
import ModalContext from '../contexts/ModalContext'

const Toast = () => {
  const {toast, setToast} = useContext(ModalContext);

  useEffect(() => {
    console.log("TOAST:",toast);
    
    if(!toast) return;
    let time = 3000;
    
    if (typeof toast !== 'string') {
      console.log("TRUE");
      time = toast.time
    }
    console.log("Time",time);
    // eslint-disable-next-line no-undef
    const a = setInterval(() => {
      console.log("Removed Toast");
      setToast("");
      // eslint-disable-next-line no-undef
      clearInterval(a);
      return;
    }, time);
    // eslint-disable-next-line no-undef
    return () => clearInterval(a);
  }, [toast]);

  return (
    <>
    {toast &&
    <Animated.View entering={FadeIn.duration(500)} exiting={FadeOut.duration(500)} style={{position: 'absolute', bottom:'20%', width:'100%', zIndex:20}}>
      <View style={{marginHorizontal:'auto', padding:12, backgroundColor:'white', borderWidth:1, borderRadius:12, justifyContent:'center', flexDirection:'row', alignItems:'center', gap:12}}>
        <Info />
        <Text style={{fontWeight:600, fontSize:16}}>{typeof toast === "string" ? toast : toast.text}</Text>
      </View>
    </Animated.View>
    }
    </>
  )
}

export default Toast