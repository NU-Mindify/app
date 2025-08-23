import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AppBackground from "../../components/AppBackground";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";
import styles from "../../styles/styles";
import X from "../../assets/generic/X-White.svg";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";
import axios from "axios";
import { API_URL, avatars, navbarRoutes } from "../../constants";
import LottieView from "lottie-react-native";
import loading from "../../anim/loading_circle.json";
import { useNavigation, useRoute } from "@react-navigation/native";
import AccountContext from "../../contexts/AccountContext";
import ModalContext from "../../contexts/ModalContext";

const Leaderboard = ({ onExit, level, categoryIndex, isMastery, mode, current }) => {
  const [list, setList] = useState([]);
  const [isLoading, setLoading] = useState(true)

  const routeName = useRoute().name;  

  const getPaddingBottom = () => (navbarRoutes.includes(routeName) ? 80 : 0);
  const {setToast} = useContext(ModalContext);


  const getList = async () => {
    setLoading(true)
    try {
      let URL;
      if(mode === "mastery"){
        URL = API_URL+`/getLeaderboard?category=${categoryIndex.id}&mode=mastery`;
      }else{
        URL = API_URL+`/getLeaderboard?level=${level}&category=${categoryIndex.id}&mode=${mode}`;
      }
      const { data } = await axios.get(URL);
      
      setLoading(false)
      setList(data || []);
    } catch (error) {
      setToast("Getting Leaderboard" + error);
      console.error(error.response)
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <Animated.View
      entering={ZoomIn}
      exiting={ZoomOut}
      style={{ flex: 1, padding: 28, paddingBottom: getPaddingBottom(), maxWidth:500, width:'100%', marginHorizontal:'auto' }}
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
          padding: 12,
          borderWidth: 4,
          marginVertical: 6,
          borderColor: "#2E5A9F",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Text style={{ fontWeight: "bold" }}>{categoryIndex.name}</Text>
        {mode === "mastery" ? 
          <Text style={{ fontWeight: "bold" }}>Mastery Mode</Text>
        :
          <Text style={{ fontWeight: "bold" }}>Level: {level}</Text>
        }
        {/* <View style={tabStyle.tab}>
          <Text style={tabStyle.text}>Overall</Text>
        </View>
        <View style={[tabStyle.tab, tabStyle.tabActive]}>
          <Text style={tabStyle.textActive}>Branch</Text>
        </View>
        <View style={tabStyle.tab}>
          <Text style={tabStyle.text}>Personal</Text>
        </View> */}
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
        {isLoading && (
          <LottieView
            style={{
              width: "100%",
              height: "20%",
              marginTop: 20,
              padding: 0,
              transform: [{ scale: 1.6 }],
            }}
            speed={2}
            resizeMode="center"
            source={loading}
            autoPlay
            loop
          />
        )}
        {!isLoading && list.length === 0 && (
          <Text style={{ fontSize: 24, textAlign: "center", marginTop: 24 }}>
            No data to display yet.
          </Text>
        )}
        <ScrollView contentContainerStyle={{ padding: 12 }} style={{ flex: 1 }}>
          {list.map((user, index) => (
            <UserCard
              data={user}
              key={user._id}
              index={index}
              current={current}
            />
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

const UserCard = ({ data, index, current }) => {
  const Avatar = avatars.find(avatar => avatar.id === data.user_id.avatar)?.head || avatars[0].head;
  const nav = useNavigation();
  const { accountData } = useContext(AccountContext);
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          if(data.user_id._id === accountData._id){
            return;
          }
          nav.navigate("View Other Profile",{user_id: data.user_id._id})
        }}
        style={[
          {
            backgroundColor: data._id === current ? "#fdffcc" : "#FBF0EE",
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
          <Avatar width={50} height={60} />
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
      </TouchableOpacity>
    </>
  );
};
