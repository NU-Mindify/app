import { View, Text } from 'react-native'
import Home from '../assets/bottom-nav/home.svg'
import Glossary from '../assets/bottom-nav/glossary.svg'
import Categories from '../assets/bottom-nav/categories.svg'
import Mindmap from '../assets/bottom-nav/mindmap.svg'
import Chatbot from '../assets/bottom-nav/chatbot.svg'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { CommonActions, StackActions, useNavigation, useNavigationState } from '@react-navigation/native'
import Animated, { FadeInDown, FadeOutDown, SlideInDown, SlideInUp } from 'react-native-reanimated'
import { navbarRoutes } from '../constants'

const actions = [
  {name: "Categories", icon: Categories, path: null},
  {name: "Glossary", icon: Glossary, path: "Glossary"},
  {name: "Home", icon: Home, path: "Home"},
  {name: "Mindmap", icon: Mindmap, path: "Mindmap"},
  {name: "Chatbot", icon: Chatbot, path: "Chatbot"}
]

const BottomNavigation = () => {
  
  const nav = useNavigation()
  const routeName = useNavigationState(
    (state) => {
      if(!state){
        return "None"
      }
      return state.routes[state.index]?.name
    }
  );
  
  
  if(!navbarRoutes.includes(routeName)) return;

  return (
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
        position: "absolute",
        width: "100%",
        bottom: 0,
        paddingBottom: 12,
        paddingHorizontal: 24,
      }}
    >
      {actions.map((action) => (
        <TouchableOpacity
          style={{
            padding: 12,
            paddingHorizontal: action.path === routeName ? 24 : 12,
            backgroundColor:
              action.path === routeName ? "rgba(0,0,0,0.05)" : "white",
            borderTopWidth: action.path === routeName ? 4 : 0,
            borderColor: "#000",
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
          }}
          key={action.name}
          onPress={() => {
            if (action.path && action.path !== routeName) {
              nav.dispatch(
                StackActions.replace(action.path)
              )
            }
          }}
        >
          <action.icon />
          {/* <Text>{action.name}</Text> */}
        </TouchableOpacity>
      ))}
    </Animated.View>
  );
}

export default BottomNavigation