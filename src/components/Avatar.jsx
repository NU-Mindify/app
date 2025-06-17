import { View, Text } from 'react-native'
import React from 'react'

const Avatar = ({Head, Cloth, style = {}, size=0.7}) => {
  return (
    <View
      style={[{
        margin: "auto",
        justifyContent: "center",
        alignItems: "center",
      }, style]}
    >
      <Head width={150 * size} height={290 * size} style={{ zIndex: 0 }} />
      <Cloth
        width={150 * size}
        height={160 * size}
        style={{ position: "absolute", bottom: 0 }}
      />
    </View>
  )
}

export default Avatar