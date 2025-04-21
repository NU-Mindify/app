import {
  View,
  Text,
  Pressable,
  ToastAndroid,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AppBackground from "../../components/AppBackground";
import styles from "../../styles/styles";
import Button from "../../components/Button";
import LevelTitle from "../../assets/level/levelTitle.svg";
import { useNavigation } from "@react-navigation/native";
import { avatars, categoriesObj } from "../../constants";
import AccountContext from "../../contexts/AccountContext";
import Input from "../../components/Input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Edit } from "lucide-react-native";
import badges from "../../assets/badges/badges.png";
import Animated, { SlideInUp, SlideOutUp } from "react-native-reanimated";
import X from "../../assets/generic/X-White.svg";
import axios from "axios";

const ViewProfile = () => {
  const nav = useNavigation();
  const { accountData, progressData, setProgressData } = useContext(AccountContext);
  const [selectedAvatar, setSelectedAvatar] = useState(accountData.avatar);
  const Avatar = avatars[selectedAvatar];
  
  useEffect(() => {
    const c = async () => {
      try {
        const { data:progressData } = await axios.get(
          `${process.env.EXPO_PUBLIC_URL}/getProgress/${accountData._id}`,
          { timeout: 10000 }
        );
        setProgressData(progressData)
        console.log(progressData.classic);
        
      } catch (error) {
        console.error("ViewProfileError", error);
      }
    }
    c()
  }, [])

  return (
    <AppBackground>
      <View
        style={{
          position: "absolute",
          top: 0,
          right: "8%",
        }}
      >
        <Animated.View
          entering={SlideInUp.delay(200)}
          exiting={SlideOutUp}
          style={[
            {
              marginHorizontal: "auto",
              backgroundColor: "#00000044",
              borderBottomStartRadius: 24,
              borderBottomEndRadius: 24,
              padding: 12,
              paddingBottom: 24,
              borderWidth: 2,
            },
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              nav.replace("Home");
            }}
          >
            <X width={42} height={42} />
          </TouchableOpacity>
        </Animated.View>
      </View>
      <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 99,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 8,
              borderColor: "#FFD41C",
              width: 160,
              height: 160,
            }}
          >
            <Avatar width={120} height={120} />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 20,
              alignItems: "center",
              gap: 4,
            }}
          >
            <Text
              style={{
                backgroundColor: "#2C519F",
                borderRadius: 24,
                boxShadow: "0px 2px 12px #EDE09480",
                borderWidth: 8,
                borderColor: "#FFD41C",
                width: 250,
                textAlign: "center",
                padding: 12,
                color: "white",
                fontWeight: 900,
                fontSize: 24,
              }}
              inputStyle={styles.entryTitle}
            >
              {accountData.username}
            </Text>
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => {
                nav.replace("Edit Profile");
              }}
            >
              <Edit size={24} color={"black"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Split */}
      <View
        style={{
          borderTopColor: "#FDD116",
          borderTopWidth: 6,
          backgroundColor: "#273574",
          justifyContent: "flex-end",
          alignItems: "center",
          flex: 3,
        }}
      >
        <View
          style={{ justifyContent: "center", position: "absolute", top: -40 }}
        >
          <LevelTitle style={{ marginHorizontal: "auto" }} />
          <Text
            style={[
              styles.entryTitle,
              {
                position: "absolute",
                textAlign: "center",
                width: "100%",
                fontFamily: "LilitaOne_400Regular",
              },
            ]}
          >
            Progress
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
          }}
        >
          {categoriesObj.map(({ id, name }, index) => (
            <CategoryCard
              name={name}
              percent={Math.floor((progressData.classic[id] / 5) * 100)}
              key={index}
            />
          ))}
          {/* {progressData.classic.map(({ category, level }, index) => (
            <CategoryCard
              name={categoryNames[category]}
              percent={Math.floor((level / 5) * 100)}
              key={index}
            />
          ))} */}
        </View>
        <Text style={[styles.entryTitle, { paddingVertical: 12 }]}>Badges</Text>
        <Image source={badges} style={{ marginBottom: 24 }}></Image>
      </View>
    </AppBackground>
  );
};

export default ViewProfile;

const CategoryCard = ({ name, percent }) => {
  return (
    <View
      style={{
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "black",
        width: 300,
        padding: 8,
        borderRadius: 12,
        borderWidth: 4,
      }}
    >
      <Text>{name}</Text>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#273574",
          width: "100%",
          borderRadius: 12,
        }}
      >
        <View
          style={{
            width: `${percent}%`,
            height: 20,
            backgroundColor: "green",
            borderRadius: 12,
          }}
        >
          <Text
            style={{ color: "white", fontWeight: 800, textAlign: "center" }}
          >
            {percent}%
          </Text>
        </View>
        {percent < 10 && (
          <Text
            style={{
              color: "white",
              fontWeight: 800,
              textAlign: "center",
              paddingHorizontal: 8,
            }}
          >
            {percent}%
          </Text>
        )}
      </View>
    </View>
  );
};
