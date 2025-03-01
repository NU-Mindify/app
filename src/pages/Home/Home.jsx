import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import Animated, { FadeIn } from "react-native-reanimated";
import {
  BookMarkedIcon,
  BrainCircuitIcon,
  LogOut,
  MessageSquareQuoteIcon,
} from "lucide-react-native";
import styles from "../../styles/styles";
import CategoryCarousel from "./CategoryCarousel";
import AccountContext from "../../contexts/AccountContext";
import MindifiyLogo from "../../assets/Logo.png";
import AppBackground from "../../components/AppBackground";
import { useNavigation } from "@react-navigation/native";
import { avatars } from '../../constants'

const Home = () => {
  const nav = useNavigation();
  const { accountData, setAccountData } = useContext(AccountContext);
  const Avatar = avatars[accountData ? accountData.avatar : 0]

  return (
    <Animated.View entering={FadeIn.duration(700)} style={{ flex: 1 }}>
      <AppBackground>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            padding: 8,
          }}
        >
          <Pressable
            style={[styles.homeRoundedIcon, { padding: 4 }]}
            onPress={() => nav.navigate("View Profile")}
          >
            <Avatar width={60} height={60} />
          </Pressable>
          <Animated.Image
            source={MindifiyLogo}
            resizeMode="contain"
            style={{ width: 200, height: 100 }}
          />
          <Pressable
            style={styles.homeRoundedIcon}
            onPress={() => {
              nav.replace("Get Started");
              setAccountData(null);

            }}
          >
            <LogOut size={32} color={"black"} />
          </Pressable>
        </View>
        <View style={{ flex: 1 }}>
          <CategoryCarousel />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: 20,
          }}
        >
          <TouchableOpacity style={{}} onPress={() => nav.navigate("Glossary")}>
            <View style={styles.button}>
              <BookMarkedIcon size={32} color={"black"} />
            </View>
            <Text style={homeStyles.buttonText}>Glossary</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{}} onPress={() => nav.navigate("Chatbot")}>
            <View style={[styles.button, { flexDirection: "row" }]}>
              <MessageSquareQuoteIcon size={32} color={"black"} />
            </View>
            <Text style={homeStyles.buttonText}>ChatBot</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{}} onPress={() => nav.navigate("Mindmap")}>
            <View style={styles.button}>
              <BrainCircuitIcon size={32} color={"black"} />
            </View>
            <Text style={homeStyles.buttonText}>Mind Map</Text>
          </TouchableOpacity>
        </View>
      </AppBackground>
    </Animated.View>
  );
};

export default Home;

const homeStyles = StyleSheet.create({
  buttonText: {
    ...styles.buttonText,
    color: "white",
  },
});
