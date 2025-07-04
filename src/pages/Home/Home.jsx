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
  List,
  LogOut,
  MessageSquareQuoteIcon,
  UserSearch,
} from "lucide-react-native";
import styles from "../../styles/styles";
import CategoryCarousel from "./CategoryCarousel";
import AccountContext from "../../contexts/AccountContext";
import MindifiyLogo from "../../assets/Logo.png";
import AppBackground from "../../components/AppBackground";
import { useNavigation } from "@react-navigation/native";
import { API_URL, avatars, branches } from '../../constants'
import { getAuth, signOut } from "firebase/auth";
import useFirebase, { SignOut } from "../../hooks/useFirebase";
import ChooseBanner from '../../assets/categories/ChooseBanner.svg';
import ModalContext from "../../contexts/ModalContext";
import Settings from '../../assets/settings/settings.svg'
import axios from "axios";
import LoadingOverlay from "../../components/LoadingOverlay";
import TypeWriter from "react-native-typewriter";

const Home = () => {
  const nav = useNavigation();
  const { accountData, progressData, setAccountData } = useContext(AccountContext);
  const {setModal} = useContext(ModalContext);
  const { getUserData } = useFirebase();
  useEffect(()=> {
    if(!accountData || !progressData ){
      getUserData(getAuth().currentUser.uid)
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

  
  useEffect(() => {
    if(accountData.tutorial.worlds){
      // setModal({
      //   mode: "Tutorial-Worlds",
      //   secondaryFn: () => {
      //     removeTutorial()
      //     setModal(null)
      //   },
      //   background: "darker",
      // });
      nav.navigate("Story");
    }
  }, [] )

  if(!accountData || !progressData){
    return <LoadingOverlay text={"Registering..."} />
  }
  const Avatar = avatars.find((avatar) => avatar.id === accountData.avatar).head;
  return (
    <Animated.View style={{ flex: 1 }}>
      <AppBackground>
        <View
          style={{
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "row",
            paddingTop:12,
            gap:8,
          }}
        >
          <View style={{ flexDirection:'row', alignItems:'center', gap:8}}>
            <Pressable
              style={[styles.homeRoundedIcon, { padding: 10, flexDirection:'row' }]}
              onPress={() => nav.navigate("View Profile")}
            >
              <Avatar width={48} height={48} />
            </Pressable>
            <View>
              <Text style={{fontSize:24, color:'white', fontFamily:'LilitaOne-Regular', textAlign:'center'}}>{accountData.first_name.toUpperCase()}</Text>
              <Text style={{fontSize:16, color:'white', fontFamily:'LilitaOne-Regular', textAlign:'center'}}>-- {branches.find(branch => accountData.branch === branch.id).name} --</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', gap: 4}}>
            <Pressable
              style={[styles.homeRoundedIcon, { padding: 6 }]}
              onPress={() => {
                setModal({
                  mode: "Search",
                  secondaryFn: () => setModal(null),
                });
              }}
            >
              <UserSearch width={32} height={32} color={"black"} />
            </Pressable>
            <Pressable
              style={[styles.homeRoundedIcon, { padding: 6 }]}
              onPress={() => {
                setModal({
                  mode: "Settings",
                  secondaryFn: () => setModal(null)
                })
              }}
            >
              <Settings width={32} height={32} />
            </Pressable>
          </View>
        </View>
        <ChooseBanner height={120} width={300} style={{marginBottom:16, marginTop:-20, marginHorizontal:'auto'}} />
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
