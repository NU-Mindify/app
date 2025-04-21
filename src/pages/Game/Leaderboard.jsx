import { View, Text } from 'react-native'
import React from 'react'
import AppBackground from '../../components/AppBackground'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import styles from '../../styles/styles';
import X from "../../assets/generic/X-White.svg";
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';

const Leaderboard = ({onExit}) => {
  return (
    <Animated.View
      entering={ZoomIn}
      exiting={ZoomOut}
      style={{ flex: 1, padding: 28 }}
    >
      <View
        style={[
          styles.entryBackground,
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: 6,
            paddingVertical: 12,
          },
        ]}
      >
        <Text style={[styles.entryBody, { fontSize: 24, fontWeight: "bold" }]}>
          Leaderboards
        </Text>
        <TouchableOpacity onPress={onExit}>
          <X width={32} height={32} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: "#F9EBDE",
          borderRadius: 24,
          padding: 6,
          borderWidth: 4,
          marginVertical: 6,
          borderColor: "#2E5A9F",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
      </View>
      <View
        style={{
          backgroundColor: "#F9EBDE",
          flex: 1,
          borderRadius: 24,
          padding: 6,
          borderWidth: 8,
          borderColor: "#2E5A9F",
        }}
      >
        <ScrollView contentContainerStyle={{ padding: 12 }} style={{ flex: 1 }}>
          <></>
        </ScrollView>
      </View>
    </Animated.View>
  );
}

export default Leaderboard