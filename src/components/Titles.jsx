import { useContext, useState } from "react"
import AccountContext from "../contexts/AccountContext";
import axios from "axios";
import { API_URL } from "../constants";
import ModalContext from "../contexts/ModalContext";
import { Text, ScrollView, Pressable, View } from "react-native";
import Animated, { BounceIn } from "react-native-reanimated";
import { modalStyles } from "../styles/modalStyles";
import { Body } from "./StartModal";
import titlesList from '../data/titles.json'

const Titles = ({isOpen = true, onClose = () => {}}) => {
  const { accountData, setAccountData } = useContext(AccountContext)
  const { setToast } = useContext(ModalContext)
  const [selectedTitle, setSelectedTitle] = useState(accountData.title);
  
  const updateTitle = async (title) => {
    const { data } = await axios.get(`${API_URL}/equipTitle?user_id=${accountData._id}&title=${title}`)
    // const newData = {...accountData, title: title}
    setAccountData(data);
  }

  return(
    <>
    <Animated.View
      style={[
        modalStyles.modalBackground,
        {
          display: isOpen ? "flex" : "none",
          backgroundColor: "rgba(0,0,0,0.9)",
          left:0,
        },
      ]}
    >
      <Body
        onClose={onClose}
        contentStyle={{
          padding: 24,
          paddingHorizontal: 12,
          width: 300,
          height: 600,
          gap: 12,
        }}
      >
        <View style={{justifyContent:'center', alignItems:'center', gap:8}}>
        <Text
          style={{
            color: "white",
            fontFamily: "LilitaOne-Regular",
            fontSize: 32,
          }}
          >
          Select Title
        </Text>
        <Text
          style={{
            color: "white",
            fontFamily: "LilitaOne-Regular",
            fontSize: 16,
          }}
          >
          {accountData.owned_titles.length} / {titlesList.length} titles owned
        </Text>
          </View>
        <ScrollView contentContainerStyle={{ gap: 8 }}>
          {titlesList &&
            titlesList.map((titleData, index) => {
              if(accountData.owned_titles.includes(titleData.title)) return(
                <TitleItem title={titleData} key={index} onPress={() => {updateTitle(titleData.title); onClose()}} />
              )
            }  
          )}
          {
            titlesList.map((titleData, index) => {
              if (!accountData.owned_titles.includes(titleData.title)) return (
                <TitleItem title={titleData} key={index} onPress={() => setToast("Not Owned")} disabled={true} />
              )
            })
          }
        </ScrollView>
      </Body>
    </Animated.View>
    </>
  )
}

const TitleItem = ({title, isSelected = false, onPress, disabled = false}) => {
  return (
    <>
      <Pressable onPress={() => isSelected ? null : onPress()} 
      style={({ pressed }) => [
        { borderWidth:3, borderRadius:12, backgroundColor: disabled ? "gray" : "white" },
      ]}>
      <View style={{flexDirection:'row', width:250, padding:12, paddingBottom:4}}>
        <Text style={{marginEnd:'auto', fontWeight:'bold'}}>{title.title}</Text>
        {/* {isSelected &&
          <Check size={14} />
          } */}
      </View>
      <Text style={{marginEnd:'auto', paddingHorizontal:12, fontSize:12, paddingBottom:12}}>{title.description}</Text>
    </Pressable>
    </>
  )
}

export default Titles