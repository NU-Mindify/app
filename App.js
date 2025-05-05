import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Platform, StatusBar, Text } from 'react-native';
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



 useEffect(() => {
  console.log(fontLoaded, fontError);
  
   if (fontLoaded || fontError) {
     ExpoSplashScreen.hideAsync();
   }
 }, [fontLoaded, fontError]);

 if (!fontLoaded || fontError) {
   return null;
 }

  return (
    <>
      {Platform.OS !== "ios" && <StatusBar hidden={true} />}
      <NavigationContainer>
          <AccountContext.Provider value={{ accountData, setAccountData, progressData, setProgressData }}>
            <ModalContext.Provider value={{ modal, setModal }}>
              <GestureHandlerRootView>
                <Text style={{ position: 'absolute', bottom: 4, color: 'white', zIndex: 5, textAlign: 'center', width: '100%', fontSize: 8, opacity:0.6}}>Early Dev Build - 05.02 - Placeholders and Sample Assets are used. </Text>

                {/* <ResetButton /> */}
              <Stack.Navigator screenOptions={{ headerShown: false, statusBarHidden: Platform.OS !== "ios", navigationBarHidden: true, }}>
                  <Stack.Screen name="Splash" component={SplashScreen} />
                  <Stack.Screen name='Get Started' component={GetStarted} />
                  <Stack.Screen name='Verify' component={Verify} />
                  <Stack.Screen name='Terms and Conditions' component={TermsAndConditions} />

                  <Stack.Screen name='Home' component={Home} />
                  <Stack.Screen name="View Profile" component={ViewProfile} />
                  <Stack.Screen name="Edit Profile" component={EditProfile} />
                  <Stack.Screen name="Chatbot" component={Chatbot} />
                  <Stack.Screen name="Glossary" component={Glossary} />
                  <Stack.Screen name="Mindmap" component={Mindmap} />

                  <Stack.Screen name='Levels' component={Levels} />
                  <Stack.Screen name='Game' component={Game} />
                </Stack.Navigator>
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
