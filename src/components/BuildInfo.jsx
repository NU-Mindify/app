import { Text } from 'react-native'
import React from 'react'

const BuildInfo = () => {
  return (
    <Text style={{ position: 'absolute', bottom: 4, color: 'white', zIndex: 5, textAlign: 'center', width: '100%', fontSize: 8, opacity:0.6}}>Early Dev Build - 05.23 - Placeholders and Sample Assets are used. </Text>
  )
}

export default BuildInfo