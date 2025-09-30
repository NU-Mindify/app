import { View, Text, Pressable } from "react-native";
import Home from '../assets/bottom-nav/home.svg'
import Glossary from '../assets/bottom-nav/glossary.svg'
import Mindmap from '../assets/bottom-nav/mindmap.svg'
import Chatbot from '../assets/bottom-nav/chatbot.svg'
import Store from '../assets/bottom-nav/store.svg'
import Leaderboard from '../assets/bottom-nav/cards.svg'
import Animated, { FadeInDown, FadeOutDown, SlideInDown, SlideInUp } from 'react-native-reanimated'
import { navbarRoutes } from '../constants'
import { navigate } from '../utils/RootNavigation'
import { useContext, useEffect } from "react";
import { useAudioPlayer } from "expo-audio";
import AccountContext from "../contexts/AccountContext";

const actions = [
  // {name: "Categories", icon: Categories, path: null},
  {name: "Home", icon: Home, path: "Home"},
  {name: "Glossary", icon: Glossary, path: "Glossary"},
  {name: "Leaderboard", icon: Leaderboard, path: "Leaderboard"},
  {name: "Mindmap", icon: Mindmap, path: "Mindmap"},
  {name: "Mindy", icon: Chatbot, path: "Chatbot"},
  {name: "Store", icon: Store, path: "Store"}
]

const BottomNavigation = ({activeTab}) => {
  const { accountData } = useContext(AccountContext)
  const musicbg = useAudioPlayer(require("../audio/music/menus.wav"));
  useEffect(() => {
    musicbg.loop = true;
    musicbg.volume = 0.8;
    console.log("account settings",accountData?.settings);
    
    if (!accountData?.settings?.music && accountData){
      musicbg.pause();
      return;
    }
    if (!["Game", "Levels"].includes(activeTab)) {
      musicbg.play();
    } else {
      musicbg.pause();
    }
    if (activeTab === "Game") {
      musicbg.seekTo(0);
    }
  }, [activeTab, accountData]);
  
  if (!navbarRoutes.includes(activeTab)) return;
  return (
    <View style={{width:'100%',  position: "absolute", bottom: 0}}>
      <Animated.View
        entering={FadeInDown.duration(400)}
        exiting={FadeOutDown.duration(400)}
        style={{
          backgroundColor: "white",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          borderTopLeftRadius: 24,
          borderTopEndRadius: 24,
          width: "100%",
          paddingBottom: 6,
          paddingHorizontal: 24,
          maxWidth:650,
          marginHorizontal:'auto'
        }}
      >
        {actions.map((action) => {
          const isActive = action.path === activeTab;
          return (
            <Pressable
              style={[
                {
                  padding: 12,
                  paddingHorizontal: 0,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 4,
                },
              ]}
              key={action.name}
              onPress={() => {
                if (action.path && action.path !== activeTab) {
                  // nav.dispatch(
                  //   StackActions.replace(action.path)
                  // )
                  navigate(action.path);
                }
              }}
            >
              <View
                style={[
                  isActive && {
                    marginTop: -40,
                    backgroundColor: "#454e8f",
                    padding: 12,
                    borderRadius: 42,
                    borderWidth: 4,
                    borderColor: "white",
                    shadowColor: "black",
                    shadowRadius: 12,
                    boxShadow: "0px 0px 12px black",
                  },
                ]}
              >
                <action.icon width={32} height={32} />
              </View>
              {isActive && (
                <Text
                  style={{ fontFamily: "LilitaOne-Regular" }}
                  allowFontScaling={false}
                >
                  {action.name}
                </Text>
              )}
            </Pressable>
          );
        })}
      </Animated.View>
    </View>
  );
}

export default BottomNavigation