import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../styles/styles'

const Button = ({onPress, text, style={}, textStyle={}}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  )
}

export default Button