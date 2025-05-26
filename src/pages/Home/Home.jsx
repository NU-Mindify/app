import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Alert,
  BackHandler,
} from "react-native";
import React, { useContext, useEffect } from "react";
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
import { getAuth, signOut } from "firebase/auth";
import useFirebase, { SignOut } from "../../hooks/useFirebase";
import ChooseBanner from '../../assets/categories/ChooseBanner.svg';

const Home = () => {
  const nav = useNavigation();
  const { accountData, setAccountData } = useContext(AccountContext);
  const Avatar = avatars[accountData ? accountData.avatar : 0]
  const { getUserData } = useFirebase();
  useEffect(()=> {
    if(!accountData){
      getUserData(getAuth().uid)
    }
  })

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Exit?", "Are you sure you want exit NU Mindify?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <Animated.View entering={FadeIn.duration(700)} style={{ flex: 1 }}>
      <AppBackground>
        <View
          style={{
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Pressable
            style={[styles.homeRoundedIcon, { padding: 10 }]}
            onPress={() => nav.navigate("View Profile")}
          >
            <Avatar width={48} height={48} />
          </Pressable>
          <Animated.Image
            source={MindifiyLogo}
            resizeMode="contain"
            style={{ width: 200, height: 100 }}
          />
          <Pressable
            style={styles.homeRoundedIcon}
            onPress={async () => {
              // nav.replace("Get Started");
              await SignOut();
              setAccountData(null);
            }}
          >
            <LogOut size={32} color={"black"} />
          </Pressable>
        </View>
        <ChooseBanner height={120} style={{marginBottom:16}} />
        <View style={{ flex: 1 }}>
          <CategoryCarousel />
        </View>
      </AppBackground>
    </Animated.View>
  );
};

export default Home;

const homeStyles = StyleSheet.create({
  button: {
    ... styles.button, 
    width: 80,
    margin: 'auto'
  },
  buttonText: {
    ...styles.buttonText,
    color: "white",
  },
});
