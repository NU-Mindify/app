import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import AppBackground from "../../components/AppBackground";
import { ArrowLeftCircle, Edit, Star } from "lucide-react-native";
import styles from "../../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { avatars, clothes } from "../../constants";
import AccountContext from "../../contexts/AccountContext";
import { Pressable, ScrollView } from "react-native-gesture-handler";

const Store = () => {
  const nav = useNavigation();
  const { accountData, setAccountData } = useContext(AccountContext);
  const [selectedAvatar, setSelectedAvatar] = useState(accountData.avatar);
  const [selectedCloth, setSelectedCloth] = useState(clothes[0]);
  const Avatar = avatars[selectedAvatar];
  const Cloth = selectedCloth.image
  const [selectedTab, setSelectedTab] = useState("Avatar")

  return (
    <AppBackground>
      <View style={{ flex: 1 }}>
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
              if (nav.canGoBack()) {
                nav.goBack();
              } else {
                nav.replace("Home");
              }
            }}
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
            }}
          >
            <Star color={"black"} />
            <Text>200</Text>
          </View>
        </View>
        
          <View style={{margin:'auto', justifyContent:'center', alignItems:'center'}}>
            <Avatar width={120} height={120} style={{zIndex:1}} />
            <Cloth width={150} height={180} style={{marginTop:-10}} />
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
        <Tabs tabs={["Avatar", "Clothes"]} state={[selectedTab, setSelectedTab]} style={{flex: 0}} />
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
          {selectedTab === "Avatar" && avatars.map((Avatar, index) => {
            return (
              <AvatarCard
                SVG={Avatar}
                key={index}
                selected={selectedAvatar === index}
                onPress={() => setSelectedAvatar(index)}
              />
            );
          })}
          {selectedTab === "Clothes" && clothes.map((cloth, index) => (
            <AvatarCard SVG={cloth.image} key={index} selected={cloth.id === selectedCloth.id} onPress={() => setSelectedCloth(cloth)} />
          ))}
        </ScrollView>

      </View>
    </AppBackground>
  );
};

export default Store;

const AvatarCard = ({ SVG, selected, onPress }) => {
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
        height: 100,
      }}
    >
      <SVG width={60} height={60} />
      <Text style={{marginTop:'auto'}}>200<Star color={"black"} size={14} /></Text>
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
        height: 60,
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