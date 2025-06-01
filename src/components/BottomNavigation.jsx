import { View, Text } from 'react-native'
import Home from '../assets/bottom-nav/home.svg'
import Glossary from '../assets/bottom-nav/glossary.svg'
import Mindmap from '../assets/bottom-nav/mindmap.svg'
import Chatbot from '../assets/bottom-nav/chatbot.svg'
import Store from '../assets/bottom-nav/store.svg'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { CommonActions, StackActions, useNavigation, useNavigationState } from '@react-navigation/native'
import Animated, { FadeInDown, FadeOutDown, SlideInDown, SlideInUp } from 'react-native-reanimated'
import { navbarRoutes } from '../constants'

const actions = [
  // {name: "Categories", icon: Categories, path: null},
  {name: "Home", icon: Home, path: "Home"},
  {name: "Glossary", icon: Glossary, path: "Glossary"},
  {name: "Mindmap", icon: Mindmap, path: "Mindmap"},
  {name: "Chatbot", icon: Chatbot, path: "Chatbot"},
  {name: "Store", icon: Store, path: "Store"}
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
        paddingBottom: 6,
        paddingHorizontal: 24,
      }}
    >
      {actions.map((action) => {
        const isActive = action.path === routeName
        return (
        <TouchableOpacity
          style={[{
            padding: 12,
            paddingHorizontal:0,
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
          }]}
          key={action.name}
          onPress={() => {
            if (action.path && action.path !== routeName) {
              nav.dispatch(
                StackActions.replace(action.path)
              )
            }
          }}
        >
        <View style={[isActive && {marginTop:-30, backgroundColor:'#454e8f',padding:12, borderRadius:42, borderWidth:4, borderColor:'white', shadowColor: 'black', shadowRadius:12, boxShadow: "0px 0px 12px black"}]}>
          <action.icon width={32} height={32} />
        </View>
        {isActive && (<Text style={{fontFamily:'LilitaOne-Regular'}} allowFontScaling={false}>{action.name}</Text>)}
        </TouchableOpacity>
      )})}
    </Animated.View>
  );
}

export default BottomNavigation