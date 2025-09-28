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
        <Text
          style={{
            color: "white",
            fontFamily: "LilitaOne-Regular",
            fontSize: 28,
          }}
        >
          Select Title
        </Text>
        <ScrollView contentContainerStyle={{ gap: 8 }}>
          {titlesList &&
            titlesList.map((titleData, index) => (
              <TitleItem title={titleData} key={index} onPress={() => {updateTitle(titleData.title); onClose()}} />
            ))}
        </ScrollView>
      </Body>
    </Animated.View>
    </>
  )
}

const TitleItem = ({title, isSelected = false, onPress}) => {
  return (
    <>
      <Pressable onPress={() => isSelected ? null : onPress()} 
      style={({ pressed }) => [
        { borderWidth:3, borderRadius:12, backgroundColor: "white" },
      ]}>
      <View style={{flexDirection:'row', width:250, padding:12}}>
        <Text style={{marginEnd:'auto'}}>{title.title}</Text>
        {/* {isSelected &&
          <Check size={14} />
          } */}
      </View>
      <Text style={{marginEnd:'auto'}}>{title.description}</Text>
    </Pressable>
    </>
  )
}

export const addTitle = async (title) => {
  const { accountData } = useContext(AccountContext);
  const { setToast } = useContext(ModalContext);
  if(accountData?.owned_titles.includes(title)){
    return;
  }
  try {
    const { data } = await axios.get(`${API_URL}/addTitle?user_id=${accountData._id}&title=${title}`)
  } catch (error) {
    setToast("Failed to add title.")
  }
}

export default Titles