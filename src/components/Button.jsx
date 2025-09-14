import { Text, Pressable } from 'react-native'
import styles from '../styles/styles'

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