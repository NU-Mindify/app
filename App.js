import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountContext from './src/contexts/AccountContext';
import ModalContext from './src/contexts/ModalContext';
import React, { useState } from 'react';
import GetStarted from './src/pages/Entry/GetStarted';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Home from './src/pages/Home/Home';
import Chatbot from './src/pages/Chatbot/Chatbot';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar, Text } from 'react-native';
import StartModal from './src/components/StartModal'
import Levels from './src/pages/Level/Levels';
import Game from './src/pages/Game/Game';
import EditProfile from './src/pages/Profile/EditProfile';
import { ResetButton, updateStorage } from './src/contexts/useAccount';
import Glossary from './src/pages/Glossary/Glossary';
import Mindmap from './src/pages/Mindmap/Mindmap';
import ViewProfile from './src/pages/Profile/ViewProfille';

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
  const Stack = createNativeStackNavigator();
  const queryClient = new QueryClient()
  const [accountData, setAccountState] = useState(null)
  const setAccountData = (value) => {
    setAccountState(value);
    updateStorage(value)
  }
  /**
   * @type {[Modal, React.Dispatch<React.SetStateAction<Modal>>]}
   */
  const [modal, setModal] = useState(null)
  return (
    <>
      <StatusBar hidden={true} />
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <AccountContext.Provider value={{ accountData, setAccountData }}>
            <ModalContext.Provider value={{ modal, setModal }}>
              <GestureHandlerRootView>
                <Text style={{ position: 'absolute', bottom: 4, color: 'white', zIndex: 5, textAlign: 'center', width: '100%', fontSize: 12, opacity:0.2}}>Early Dev Build - 2.28 - Placeholders and Sample Assets are used. </Text>
                <ResetButton />
                <Stack.Navigator screenOptions={{ headerShown: false, statusBarHidden: true, navigationBarHidden: true, }}>
                  <Stack.Screen name='Get Started' component={GetStarted} />

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
        </QueryClientProvider>
      </NavigationContainer>
    </>
  );
}
