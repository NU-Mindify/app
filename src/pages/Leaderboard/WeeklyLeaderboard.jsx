import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AppBackground from "../../components/AppBackground";
import { ArrowLeftCircle, CircleQuestionMark } from "lucide-react-native";
import styles from "../../styles/styles";
import First from "../../assets/leaderboards/first.svg"
import Second from "../../assets/leaderboards/second.svg"
import Third from "../../assets/leaderboards/third.svg"
import Avatar from "../../components/Avatar";
import AccountContext from "../../contexts/AccountContext";
import { API_URL, avatars, clothes } from "../../constants";
import Animated, { Easing, FadeInDown, SlideInDown } from "react-native-reanimated";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import ModalContext from "../../contexts/ModalContext";

const WeeklyLeaderboard = () => {
  const nav = useNavigation();
  const {setModal} = useContext(ModalContext)
  const [leaderboard, setLeaderboard] = useState([])

  const getLeaderboard = async () => {
    try {
      const {data} = await axios.get(API_URL + "/getWeeklyLeaderboard");
      setLeaderboard(data)
    } catch (error) {
      console.error(error);
      
    }
  }

  useEffect(() => {
    getLeaderboard()
  }, [])

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
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setModal({
              title: "Leaderboard",
              body: (
                <View style={{maxWidth:300}}>
                  <Text style={{color:'white', fontWeight:700, paddingHorizontal:18, padding:12, textAlign:'center', fontSize:18}}>
                    Earn points for each correct answer you get.
                  </Text>
                  <View style={{flexDirection:'row', justifyContent: 'space-between', width:200, marginHorizontal:'auto'}}>
                    <Text style={{color:'white', fontSize:18}}>Easy</Text>
                    <Text style={{color:'white', fontSize:18}}>1 point</Text>
                  </View>
                  <View style={{flexDirection:'row', justifyContent: 'space-between', width:200, marginHorizontal:'auto'}}>
                    <Text style={{color:'white', fontSize:18}}>Average</Text>
                    <Text style={{color:'white', fontSize:18}}>2 points</Text>
                  </View>
                  <View style={{flexDirection:'row', justifyContent: 'space-between', width:200, marginHorizontal:'auto'}}>
                    <Text style={{color:'white', fontSize:18}}>Difficult</Text>
                    <Text style={{color:'white', fontSize:18}}>3 points</Text>
                  </View>
                </View>
              ),
              primaryFn: () => {
                setModal(null);
              },
              closeButton: false,
            });
          }}
        >
          <CircleQuestionMark size={32} color={"white"} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "center",
          marginTop: 40,
        }}
      >
        {leaderboard.length > 0 && (
          <>
            <TopUsers account={leaderboard[1]} Image={Second} place={2} />
            <TopUsers account={leaderboard[0]} Image={First} place={1} />
            <TopUsers account={leaderboard[2]} Image={Third} place={3} />
          </>
        )}
      </View>
      <ScrollView
        style={{
          backgroundColor: "white",
          marginTop: -80,
          marginBottom: -40,
          borderTopRightRadius: 24,
          borderTopLeftRadius: 24,
        }}
        contentContainerStyle={{ paddingVertical: 24 }}
      >
        {leaderboard.map((user, index) => (
          <LeaderbooardItem account={user} index={index} key={index} />
        ))}
      </ScrollView>
    </AppBackground>
  );
};

export default WeeklyLeaderboard;

const TopUsers = ({account, place, Image }) => {
  console.log("Topuseraccount",account);
  const { accountData } = useContext(AccountContext);
  const nav = useNavigation();
  
  const head = avatars.find((avatar) => avatar.id === account?.user_id.avatar).body;
  const cloth = clothes.find((cloth) => cloth.id === account?.user_id.cloth).image;

  const onClick = () => {
    if(account.user_id._id === accountData._id) return;
    nav.navigate("View Other Profile", { user_id: account.user_id._id });
  }

  return (
    <TouchableOpacity onPress={onClick}>
      <Animated.View entering={FadeInDown.damping(200).delay(400 * place).easing(Easing.inOut(Easing.quad))} >
      <View>
        <Text ellipsizeMode="tail" style={{ textAlign: "center", fontFamily:'LilitaOne-Regular', color:'white', fontSize:26, maxWidth:110, margin:'auto' }}>{account?.user_id.username}</Text>
        <Text ellipsizeMode="tail" style={{ textAlign: "center", color:'white', fontSize:10, maxWidth:110, margin:'auto' }}>{account?.user_id.title || ""}</Text>
        <Text style={{ textAlign: "center", color:'white', fontSize:16 }}>{account?.points} points</Text>
      </View>
      <Avatar Head={head} Cloth={cloth} size={0.6} style={{marginBottom: -10, zIndex: 10}}/>
      <Image />
    </Animated.View>
  </TouchableOpacity>
  )
}

const LeaderbooardItem = ({account, index}) => {
  const { accountData } = useContext(AccountContext);
  const nav = useNavigation();

  const Head = avatars.find((avatar) => avatar.id === account?.user_id.avatar).head;

  const onClick = () => {
    if (account.user_id._id === accountData._id) return;
    nav.navigate("View Other Profile", { user_id: account.user_id._id });
  };
  if(index<= 2) return;
  return (
    <TouchableOpacity onPress={onClick}>
      <View style={{flexDirection:'row', padding:16, alignItems:'center', gap:12, marginHorizontal:18, borderBottomWidth:1, borderColor:'#00000022'}}>
        <Text style={{fontSize: 24, fontFamily:'LilitaOne-Regular', width:36, textAlign:'center'}}>{index + 1}</Text>
        <View>
          <Head width={50} height={50} />
        </View>
      <View>
        <Text ellipsizeMode="tail" style={{ fontFamily:'LilitaOne-Regular', fontSize:24, marginEnd:'auto' }}>{account?.user_id.username}</Text>
        <Text ellipsizeMode="tail" style={{ fontSize:12 }}>{account?.user_id.title || "Curious Child"}</Text>
      </View>
      <Text style={{ textAlign: "center", marginStart:'auto', fontWeight:'600', fontSize:18 }}>{account?.points} points</Text>
    </View>
  </TouchableOpacity>
  )
}