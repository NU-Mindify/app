import { Text, Pressable } from 'react-native'
import styles from '../styles/styles'
import { useAudioPlayer } from 'expo-audio';

const Button = ({onPress, text, style={}, textStyle={}, disabled = false, hexColor = "#FDB813"}) => {
  const clickSound = useAudioPlayer(require("../audio/click.wav"));
  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        style,
        { backgroundColor: pressed ? hexColor + "AA" : hexColor },
      ]}
      onPress={e => {onPress(e); clickSound.play()}}
    >
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </Pressable>
  );
}

export default Button