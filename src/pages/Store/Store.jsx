import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AppBackground from "../../components/AppBackground";
import { ArrowLeftCircle, Edit } from "lucide-react-native";
import Star from "../../assets/results/smallStar.png";
import styles from "../../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { API_URL, avatars, clothes } from "../../constants";
import AccountContext from "../../contexts/AccountContext";
import { Pressable, ScrollView } from "react-native-gesture-handler";
import Button from "../../components/Button";
import axios from "axios";
import ModalContext from "../../contexts/ModalContext";

const Store = () => {
  const nav = useNavigation();
  const { accountData, setAccountData } = useContext(AccountContext);
  const { setModal } = useContext(ModalContext);
  const [selectedAvatar, setSelectedAvatar] = useState(accountData.avatar || "b1");
  const [selectedCloth, setSelectedCloth] = useState(accountData.cloth || "male_unform" );
  const [isBuyDisabled, setIsBuyDisabled] = useState(true)
  const Avatar = avatars.find((avatar) => avatar.id === selectedAvatar).body;
  const Cloth = clothes.find((cloth) => cloth.id === selectedCloth).image;
  const [selectedTab, setSelectedTab] = useState("Avatar")
  useEffect(()=> {
    if (selectedTab === "Avatar") {
      setSelectedCloth(accountData.cloth);
    } else {
      setSelectedAvatar(accountData.avatar);
    }
  }, [selectedTab])
  useEffect(()=> {
    if(accountData.points < 5){
      setIsBuyDisabled(true)
      return;
    }
    if(accountData.cloth !== selectedCloth || accountData.avatar !== selectedAvatar){
      setIsBuyDisabled(false)
    }else{
      setIsBuyDisabled(true)
    }
  }, [selectedAvatar, selectedCloth, accountData])
  const onBuy = async () => {
    let URL = ""
    if(selectedTab === "Avatar"){
      URL = API_URL + "/userBuy?item="+selectedAvatar+"&user_id="+accountData._id
    }else if(selectedTab === "Clothes")
    URL = API_URL + "/userBuy?item="+selectedCloth+"&user_id="+accountData._id

    try {
      const {data} = await axios.get(URL);
      setAccountData(data)
      setModal({
        title: "Store",
        body:"You've successfully bought an item!",
        primaryFn: () => {setModal(null)},
        secondaryFn: () => {setModal(null)}
      })
    } catch (error) {
      console.error("buying error",error);
    }
  }
  return (
    <AppBackground>
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            margin: 14,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              if (nav.canGoBack()) {
                nav.goBack();
              } else {
                nav.replace("Home");
              }
            }}
            style={{ position: "absolute", left: 0 }}
          >
            <ArrowLeftCircle width={42} height={42} color={"white"} />
          </TouchableOpacity>
          <Text
            style={[
              styles.entryTitle,
              {
                fontSize: 32,
              },
            ]}
          >
            STORE
          </Text>
          <View
            style={{
              backgroundColor: "white",
              padding: 4,
              borderRadius: 8,
              flexDirection: "row",
              alignItems: "center",
              position: "absolute",
              right: 0,
              paddingHorizontal:12,
            }}
          >
            <Image
              source={Star}
              style={[
                {
                  height: 35,
                  width: 30,
                  marginRight:4
                },
              ]}
              resizeMode="contain"
            />
            <Text style={{ fontFamily: "LilitaOne-Regular", fontSize: 24 }}>
              {accountData.points}
            </Text>
          </View>
        </View>

        <View
          style={{
            margin: "auto",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar width={230} height={290} style={{ zIndex: 0 }} />
          <Cloth
            width={150}
            height={160}
            style={{ position: "absolute", bottom: 0 }}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: "#406FC7",
          borderColor: "#FFDE4F",
          borderTopWidth: 4,
        }}
      >
        <Tabs
          tabs={["Avatar", "Clothes"]}
          state={[selectedTab, setSelectedTab]}
          style={{ flex: 0 }}
        />
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "wrap",
            padding: 24,
            gap: 12,
          }}
        >
          {selectedTab === "Avatar" &&
            avatars.map((Avatar, index) => {
              if (accountData.items.includes(Avatar.id)) {
                return null;
              }
              return (
                <AvatarCard
                  SVG={Avatar.head}
                  key={index}
                  selected={selectedAvatar === Avatar.id}
                  onPress={() => setSelectedAvatar(Avatar.id)}
                />
              );
            })}
          {selectedTab === "Clothes" &&
            clothes.map((cloth, index) => {
              if (accountData.items.includes(cloth.id)) {
                return null;
              }
              return (
                <AvatarCard
                  SVG={cloth.image}
                  key={index}
                  selected={cloth.id === selectedCloth}
                  onPress={() => setSelectedCloth(cloth.id)}
                  type={"clothes"}
                />
              );
            })}
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            gap: 4,
            paddingHorizontal: 24,
            marginVertical: 24,
            marginTop: 12,
          }}
        >
          <Button
            style={[{ flex: 0, width: "50%", margin: "auto",}, isBuyDisabled && { backgroundColor: "gray" }] }
            onPress={onBuy}
            text={"Buy"}
            disabled={isBuyDisabled}
          />
        </View>
      </View>
    </AppBackground>
  );
};

export default Store;

const AvatarCard = ({ SVG, selected, onPress, type }) => {
  const {accountData} = useContext(AccountContext);
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: selected ? "#BBBBBB" : "white",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 8,
        borderColor: selected ? "#fff41c" : "#FFD41C",
        width: 100,
        height: type === "clothes" ? 120 : 100,
      }}
    >
      <SVG width={60} height={type === "clothes" ? 80 : 60} />
      <View style={{marginTop:'auto', flexDirection:'row', gap:2}}>
      <Text style={{marginTop:'auto', justifyContent:'center', alignItems:'center'}}>5 
      </Text>
        <Image source={Star} style={[{height: 20, width: 20},]}/>

      </View>
    </Pressable>
  );
};


const Tabs = ({state, tabs, style}) => {
  const [mode, setMode] = state
  return (
    <View
      style={[{
        backgroundColor: "#F9EBDE",
        borderRadius: 24,
        padding: 6,
        borderWidth: 4,
        marginVertical: 6,
        marginHorizontal: 24,
        borderColor: "#2E5A9F",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: 'center',
        flex: 1,
      }, style]}
    >
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab}
          style={[
            tabStyle.tab,
            mode === tab ? tabStyle.tabActive : {},
          ]}
          onPress={() => setMode(tab)}
        >
          <Text style={mode === tab ? tabStyle.textActive : tabStyle.text}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}
const tabStyle = {
  tab: { flex: 1, borderRadius: 12, padding: 12 },
  tabActive: { backgroundColor: "#2E5A9F" },
  text: { textAlign: "center", color: "#2E5A9F", fontWeight: "bold", },
  textActive: { color: "white", fontWeight: "bold", textAlign: "center" },
};