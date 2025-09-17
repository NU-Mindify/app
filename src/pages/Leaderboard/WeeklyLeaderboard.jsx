import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import AppBackground from "../../components/AppBackground";
import { ArrowLeftCircle } from "lucide-react-native";
import styles from "../../styles/styles";
import First from "../../assets/leaderboards/first.svg"
import Second from "../../assets/leaderboards/second.svg"
import Third from "../../assets/leaderboards/third.svg"
import Avatar from "../../components/Avatar";
import AccountContext from "../../contexts/AccountContext";
import { avatars, clothes } from "../../constants";
import Animated, { FadeInDown, SlideInDown } from "react-native-reanimated";

const WeeklyLeaderboard = () => {
  const { accountData } = useContext(AccountContext);

  const sampleData = [
    {user_id: accountData, weekly_score: 200},
    {user_id: accountData, weekly_score: 150},
    {user_id: accountData, weekly_score: 110},
  ]

  return (
    <AppBackground>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 14,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            nav.replace("Home");
          }}
        >
          <ArrowLeftCircle size={32} color={"white"} />
        </TouchableOpacity>
        <Text style={[styles.entryTitle, { fontSize: 32 }]}>Leaderboards</Text>
        <View style={{ padding: 12 }} />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "center",
          marginTop: 40,
        }}
      > 
      <TopUsers account={sampleData[1]} Image={Second} />
      <TopUsers account={sampleData[0]} Image={First} />
      <TopUsers account={sampleData[2]} Image={Third} />

      </View>
      <View style={{ backgroundColor: "white", marginTop: -80 }}>
        <Text>
          asd{"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
        </Text>
      </View>
    </AppBackground>
  );
};

export default WeeklyLeaderboard;

const TopUsers = ({account, index, Image }) => {
  console.log(account);
  
  const head = avatars.find((avatar) => avatar.id === account?.user_id.avatar).body;
  const cloth = clothes.find((cloth) => cloth.id === account?.user_id.cloth).image;
  return (
    <Animated.View entering={FadeInDown.damping(200)} >
    <View>
      <Text style={{ textAlign: "center" }}>{account?.user_id  .username}</Text>
      <Text style={{ textAlign: "center" }}>{account?.weekly_score} points</Text>
    </View>
    <Avatar Head={head} Cloth={cloth} size={0.6} style={{marginBottom: -10, zIndex: 10}}/>
    <Image />
  </Animated.View>
  )
}