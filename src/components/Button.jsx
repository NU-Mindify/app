import { Text } from 'react-native'
import React from 'react'
import styles from '../styles/styles'
import { Pressable } from 'react-native-gesture-handler'

const Button = ({onPress, text, style={}, textStyle={}, disabled = false}) => {
  return (
    <Pressable
    disabled={disabled}
      style={[styles.button, style]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </Pressable>
  )
}

export default Button