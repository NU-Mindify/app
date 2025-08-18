import { Text } from 'react-native'
import React from 'react'
import styles from '../styles/styles'
import { Pressable } from 'react-native-gesture-handler'

const Button = ({onPress, text, style={}, textStyle={}, disabled = false, hexColor = "#FDB813"}) => {
  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        style,
        { backgroundColor: pressed ? hexColor + "AA" : hexColor },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </Pressable>
  );
}

export default Button