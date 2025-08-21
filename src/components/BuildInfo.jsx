import { Text } from 'react-native'
import React from 'react'

const BuildInfo = () => {
  return (
    <Text style={{ position: 'absolute', bottom: 4, color: 'white', zIndex: 5, textAlign: 'center', width: '100%', fontSize: 9, opacity:0.6}}>Early Dev Build - 08.21</Text>
  )
}

export default BuildInfo