import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, Keyboard, Text, View } from 'react-native';
import Animated, { BounceIn, FadeIn, FadeOut } from 'react-native-reanimated';
import MindifyLogo from "../../assets/Logo.png";
import AppBackground from "../../components/AppBackground";
import { printStorage } from '../../contexts/useAccount';
import styles from '../../styles/styles';
import Login from './Login';
import Register from './Register';
import { Pressable, ScrollView } from 'react-native-gesture-handler';
import TermsAndConditions from './TermsAndConditions';
import { useNavigation } from '@react-navigation/native';
import Branch from './Branch';
import axios from 'axios';
import { API_URL } from '../../constants';

export default function GetStarted(props) {
  const {state: entryState} = props.route.params

  const nav = useNavigation()
  
  const [state, setState] = useState(entryState || "get started");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false)
  const [isTermsChecked, setIsTermsChecked] = useState(false)

  const [isBranchOpen, setIsBranchOpen] = useState(false)
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [branchList, setBranchList] = useState(null)
  
  const getBranches = async () => {
    try {
      const {data:fetchedBranches} = await axios.get(API_URL+"/getBranches")
      setBranchList(fetchedBranches);
      console.log("LOGBRANCHLIST", branchList, fetchedBranches); 
    } catch (error) {
      console.error("Branch Error"); 
    }
  }
  useEffect(() => {
    getBranches();
  },[])
    
  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      "keyboardDidShow",
      handleKeyboardShow
    );
    const hideSubscription = Keyboard.addListener(
      "keyboardDidHide",
      handleKeyboardHide
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleKeyboardShow = (event) => {
    setIsKeyboardVisible(true);
  };

  const handleKeyboardHide = (event) => {
    setIsKeyboardVisible(false);
  };
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
    <Animated.View
      entering={FadeIn.duration(1000)}
      exiting={FadeOut}
      style={{ flex: 1 }}
    >
      <AppBackground>
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            padding: 24,
            paddingTop: 12,
            minHeight: "100%",
          }}
        >
          {!isKeyboardVisible && (
            <Animated.Image
              entering={BounceIn}
              exiting={FadeOut}
              source={MindifyLogo}
              resizeMode="contain"
              style={{ width: 280, height: 200 }}
            />
          )}
          {state === "login" && <Login set={setState} />}
          {state === "register" && (
            <Register
              set={setState}
              setTerms={{
                setTermsOpen: setIsTermsOpen,
                isTermsChecked,
                setIsTermsChecked,
              }}
              setBranch={{ setIsBranchOpen, selectedBranch }}
            />
          )}
        </ScrollView>
        {state === "get started" && <GetStartedButton set={setState} />}
        <TermsAndConditions
          onClose={() => setIsTermsOpen(false)}
          isOpen={isTermsOpen}
          checkbox={isTermsChecked}
          toggleCheckbox={() => setIsTermsChecked(!isTermsChecked)}
        />
        {isBranchOpen && (
          <Branch
            branches={branchList}
            setSelected={(e) => setSelectedBranch(e)}
            onClose={() => setIsBranchOpen(false)}
            selected={selectedBranch}
            isOpen={isBranchOpen}
          />
        )}
      </AppBackground>
    </Animated.View>
  );
}


const GetStartedButton = ({set}) => {
  
  return (
    <>
      <View style={{flex: 1}}></View>
      <Pressable
        style={[styles.buttonOpacity, {marginHorizontal:'auto', margin:32}]}
        onPress={() => {
          printStorage();
          set("login");
        }}
      >
        <Animated.View
          style={[styles.button]}
          entering={BounceIn.springify().delay(300)}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </Animated.View>
      </Pressable>
    </>
  );};



