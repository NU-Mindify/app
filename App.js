import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import { AppState, Platform, StatusBar, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import StartModal from './src/components/StartModal';
import AccountContext from './src/contexts/AccountContext';
import ModalContext from './src/contexts/ModalContext';
import { ResetButton } from './src/contexts/useAccount';
import './src/firebase'
import Chatbot from './src/pages/Chatbot/Chatbot';
import GetStarted from './src/pages/Entry/GetStarted';
import SplashScreen from './src/pages/Entry/SplashScreen';
import Game from './src/pages/Game/Game';
import Glossary from './src/pages/Glossary/Glossary';
import Home from './src/pages/Home/Home';
import Levels from './src/pages/Level/Levels';
import Mindmap from './src/pages/Mindmap/Mindmap';
import EditProfile from './src/pages/Profile/EditProfile';
import ViewProfile from './src/pages/Profile/ViewProfille';
import Verify from './src/pages/Entry/Verify';
import TermsAndConditions from './src/pages/Entry/TermsAndConditions';
import * as ExpoSplashScreen from 'expo-splash-screen';
import LilitaFont from './src/assets/fonts/LilitaOne-Regular.ttf'
import PoppinsFont from './src/assets/fonts/Poppins-Regular.ttf'
import PoppinsMediumFont from './src/assets/fonts/Poppins-Medium.ttf'
import { useFonts } from 'expo-font';
import BuildInfo from './src/components/BuildInfo';
import BottomNavigation from './src/components/BottomNavigation';
import ResetPassword from './src/pages/Entry/ResetPassword';
import Store from './src/pages/Store/Store';
import ViewOtherProfile from './src/pages/Profile/ViewOtherProfile';
import Story from './src/pages/Story/Story';
import { useNavigation } from '@react-navigation/native';
import { currentRouteName, getActiveRouteName, navigationRef } from './src/utils/RootNavigation';
import Toast from './src/components/Toast';
import axios from 'axios';
import { API_URL } from './src/constants';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import "./axios-logger";

ExpoSplashScreen.preventAutoHideAsync();

/**
 * @typedef {object} Modal
 * @property {string} title
 * @property {string} subtitle
 * @property {string} body
 * @property {(() => void)} primaryFn
 * @property {(() => void)} secondaryFn
 * 
 */
export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [fontLoaded, fontError] = useFonts({
    'LilitaOne-Regular': LilitaFont,
    'Poppins-Regular': PoppinsFont,
    'Poppins-Medium': PoppinsMediumFont,
  });
  const Stack = createNativeStackNavigator();
  const [accountData, setAccountData] = useState(null)
  const [progressData, setProgressData] = useState(null)
  /**
   * @type {[Modal, React.Dispatch<React.SetStateAction<Modal>>]}
  */
  const [modal, setModal] = useState(null)
  const [toast, setToast] = useState("");

  
  // For Session time
  const appState = useRef(AppState.currentState);
  const startTime = useRef(null)
  const accountRef = useRef(accountData)
  useEffect(() => {
    accountRef.current = accountData;
  }, [accountData])

  async function addSessionTime() {
    console.log(startTime.current);
    try {
      
      const endTime = moment()
      const duration = moment.duration(endTime.diff(startTime.current)).asSeconds()
      console.log("ACCOUNTREF DATA", accountRef.current);
      
      const newSession =  {
        start_time: startTime.current,
        end_time: new Date(),
        duration,
        user: accountRef?.current?._id || null
      }
      let queue = JSON.parse(await AsyncStorage.getItem("unsent_sessions")) || [];
      queue.push(newSession);
      await AsyncStorage.setItem("unsent_sessions", JSON.stringify(queue));
      addBulkSessions();
    } catch (error) {
      console.error(error);
    }
  }
  async function addBulkSessions() {
    let queue = JSON.parse(await AsyncStorage.getItem("unsent_sessions")) || [];

    if (queue.length === 0) return;
    console.log("Sending unsent sessions:", queue);

    try {
      const { data } = await axios.post(API_URL + "/addSession", queue);
      console.log(data);
      await AsyncStorage.removeItem("unsent_sessions");

    } catch (error) {
      console.error(error);

    }
  }

  useEffect(() => {
    startTime.current = moment()
    const subscription = AppState.addEventListener("change", async (nextState) => {
      if (nextState.match(/background|inactive/)) {
        console.log("on bg: Started adding");
        await addSessionTime(); // send to DB when app backgrounds
        console.log("added");
        
      }
      if(nextState === "active"){
        console.log("Active again");
        addBulkSessions()
        startTime.current = moment()
      }
    });

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    console.log(fontLoaded, fontError);

    if (fontLoaded || fontError) {
      ExpoSplashScreen.hideAsync();
    }
  }, [fontLoaded, fontError]);

  if (!fontLoaded || fontError) {
    return null;
  }

  // For Getting Active Screen
  const handleStateChange = (state) => {
    const previousRouteName = currentRouteName.current;
    const newRouteName = getActiveRouteName(state);
    if (previousRouteName !== newRouteName) {
      console.log('New route:', newRouteName);
      setActiveTab(newRouteName);
    }
    currentRouteName.current = newRouteName;
  };

  return (
    <>
      {Platform.OS !== "ios" && <StatusBar hidden={true} />}
      <NavigationContainer ref={navigationRef} 
        onReady={() => {
          currentRouteName.current = getActiveRouteName(navigationRef.current.getState());
          setActiveTab(currentRouteName.current);
        }}
        onStateChange={handleStateChange}
      >
      <AccountContext.Provider value={{ accountData, setAccountData, progressData, setProgressData }}>
        <ModalContext.Provider value={{ modal, setModal, toast, setToast }}>
          <GestureHandlerRootView>
              {/* <BuildInfo /> */}
              {/* <ResetButton /> */}
              <Stack.Navigator screenOptions={{ headerShown: false, statusBarHidden: Platform.OS !== "ios", navigationBarHidden: true, gestureEnabled: false, }}>
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name='Get Started' component={GetStarted} />
                <Stack.Screen name='Reset Password' component={ResetPassword} />
                <Stack.Screen name='Verify' component={Verify} />
                <Stack.Screen name='Terms and Conditions' component={TermsAndConditions} />

                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name="View Profile" component={ViewProfile} />
                <Stack.Screen name="Edit Profile" component={EditProfile} />
                <Stack.Screen name="Chatbot" component={Chatbot} />
                <Stack.Screen name="Glossary" component={Glossary} />
                <Stack.Screen name="Mindmap" component={Mindmap} />
                <Stack.Screen name="Store" component={Store} />

                <Stack.Screen name='Levels' component={Levels} />
                <Stack.Screen name='Game' component={Game} />

                <Stack.Screen name='View Other Profile' component={ViewOtherProfile} />
                <Stack.Screen name='Story' component={Story} />
              </Stack.Navigator>
              <BottomNavigation activeTab={activeTab} />
              <Toast />
              {modal &&
                <StartModal />
              }
          </GestureHandlerRootView>
        </ModalContext.Provider>
      </AccountContext.Provider>
      </NavigationContainer>
    </>
  );
}
