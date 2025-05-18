import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { ArrowLeftCircle, Edit } from "lucide-react-native";
import { useContext, useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated, { SlideInLeft } from "react-native-reanimated";
import AppBackground from "../../components/AppBackground";
import { avatars, branches, categoriesObj } from "../../constants";
import AccountContext from "../../contexts/AccountContext";
import styles from "../../styles/styles";

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
    <AppBackground
      gradientColors={["#3B61B7", "#35408E"]}
      style={{ paddingHorizontal: 12 }}
    >
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
          PROFILE
        </Text>
        <TouchableOpacity
          onPress={() => {
            nav.replace("Edit Profile");
          }}
        >
          <Edit size={32} color={"white"} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{paddingBottom:24}}>
        {/* Profile */}
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#35408E",
            padding: 8,
            gap: 8,
            justifyContent: "center",
            borderRadius: 8,
          }}
        >
          <ImageBackground
            source={require("../../assets/avatar/avatar_bg.png")}
            resizeMode="contain"
            style={{
              borderRadius: 24,
              justifyContent: "center",
              alignItems: "center",
              borderColor: "#FFD41C",
              boxShadow: "0px 2px 12px black",
              margin: 12,
              padding: 24
            }}
          >
            <Avatar width={80} height={80} />
          </ImageBackground>
          <View
            style={{
              flex: 1,
              justifyContent: "space-around",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Text style={[styles.entryTitle, { fontSize: 16 }]}>
              -{" "}
              {branches.find((branch) => branch.id === accountData.branch).name}{" "}
              -
            </Text>
            <Text
              style={[styles.entryTitle, { textAlign: "center", fontSize: 32 }]}
            >
              {accountData.first_name} {accountData.last_name}
            </Text>
            <Text style={[styles.entryTitle, { textAlign: "center" }]}>
              {accountData.student_id}
            </Text>
          </View>
        </View>
        {/* Split */}
        <View
          style={{
            paddingHorizontal: 16,
          }}
        >
          <Text
            style={[
              styles.entryTitle,
              { fontSize: 28, textAlign: "left", paddingVertical: 12 },
            ]}
          >
            Progress:
          </Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#E9E9E9",
              padding: 12,
              borderRadius: 12,
              gap: 4,
            }}
          >
            {categoriesObj.map(({ id, name }, index) => (
              <CategoryCard
                name={name}
                percent={Math.floor((progressData.classic[id] / 10) * 100)}
                key={index}
              />
            ))}
          </View>
          <Text
            style={[
              styles.entryTitle,
              { paddingVertical: 12, textAlign: "left", fontSize: 28 },
            ]}
          >
            Badges Earned:
          </Text>
          <ScrollView horizontal={true} contentContainerStyle={{ gap: 8 }}>
            {badges.map((src) => (
              <Badge src={src} key={src} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </AppBackground>
  );
};

export default ViewProfile;

const badges = [
  require("../../assets/badges/ap1.png"),
  require("../../assets/badges/ap2.png"),
  require("../../assets/badges/ap3.png"),
  require("../../assets/badges/ap4.png"),
  require("../../assets/badges/ap5.png"),
  require("../../assets/badges/ap6.png"),
];

const Badge = ({ src }) => {
  return (
    <View>
      <Image
        source={src}
        style={{ width: 60, height: 60 }}
        resizeMode="contain"
      />
    </View>
  );
};

const CategoryCard = ({ name, percent }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        width: 280,
        padding: 8,
        borderRadius: 12,
      }}
    >
      <Text
        style={{
          fontFamily: "LilitaOne-Regular",
          fontSize: 18,
          color: "#35408E",
        }}
      >
        {name.toUpperCase()} - {percent}%
      </Text>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#273574",
          borderWidth:1,
          width: "100%",
          borderRadius: 12,
          overflow: 'hidden'
        }}
      >
        <Animated.View
          entering={SlideInLeft.duration(500)}
          style={{
            width: `${percent}%`,
            height: 10,
            backgroundColor: getColorByPercentage(percent),
            borderRadius: 12,
          }}
        ></Animated.View>
      </View>
    </View>
  );
};

const getColorByPercentage = percentage => {
  return percentage <= 30 ? "#FFEB3B" :
  percentage <= 50 ? "#FFC107" :
  percentage <= 70 ? "#FF9800" :
  percentage <= 85 ? "#FF5722" :
  percentage <= 100 ? "#F44336" : "black"
}

const profileStyles = StyleSheet.create({
  title: {

  }
})