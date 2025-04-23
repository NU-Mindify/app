import { View, Text, ToastAndroid } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AppBackground from "../../components/AppBackground";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";
import styles from "../../styles/styles";
import X from "../../assets/generic/X-White.svg";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";
import axios from "axios";
import { API_URL, avatars } from "../../constants";

const Leaderboard = ({ onExit, level, categoryIndex, isMastery }) => {
  const [list, setList] = useState([]);

  const getList = async () => {
    try {
      const { data } = await axios.get(
        API_URL +
          `/getLeaderboard?level=${level}&category=${categoryIndex.id}&mode=${
            isMastery ? "mastery" : "classic"
          }`
      );
      setList(data);
      console.log(data);
    } catch (error) {
      ToastAndroid.show("Getting Leaderboard" + error, ToastAndroid.LONG);
    }
  };

  useEffect(() => {
    getList();
  }, []);

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
        <View style={tabStyle.tab}>
          <Text style={tabStyle.text}>Overall</Text>
        </View>
        <View style={[tabStyle.tab, tabStyle.tabActive]}>
          <Text style={tabStyle.textActive}>Branch</Text>
        </View>
        <View style={tabStyle.tab}>
          <Text style={tabStyle.text}>Personal</Text>
        </View>
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
          {list.map((user, index) => (
            <UserCard data={user} key={user._id} index={index} />
          ))}
        </ScrollView>
      </View>
    </Animated.View>
  );
};

const tabStyle = {
  tab: { flex: 1, borderRadius: 12, padding: 12 },
  tabActive: { backgroundColor: "#2E5A9F" },
  text: { textAlign: "center", color: "#2E5A9F", fontWeight: "bold" },
  textActive: { color: "white", fontWeight: "bold", textAlign: "center" },
};

export default Leaderboard;

const UserCard = ({ data, index }) => {
  const Avatar = avatars[data.user_id.avatar];
  return (
    <>
      <View
        style={[
          {
            backgroundColor: "#FBF0EE",
            borderColor: "white",
            boxShadow: `0px 2px 6px black`,
            borderWidth: 2,
            marginBottom: 8,
            padding: 12,
            borderRadius: 12,
            maxWidth: 500,
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            height: 64,
          }}
        >
          <Text>{index + 1}.</Text>
          <Avatar />
          <Text style={{ fontSize: 20, marginStart: 12 }}>
            {data.user_id.username}
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 24, textAlign: "right", fontWeight: 'bold' }}>
            {Math.floor((data.correct / data.total_items) * 100)}%
          </Text>
          <Text style={{ fontSize: 16, textAlign: "right" }}>
            Score: {data.correct}/{data.total_items}
          </Text>
          <Text style={{ fontSize: 12, textAlign: "right" }}>
            {data.time_completion} seconds
          </Text>
        </View>
      </View>
    </>
  );
};
