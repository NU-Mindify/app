import { View, Text, BackHandler, Image, Pressable, ImageBackground } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TypeWriter from 'react-native-typewriter';
import Avatar from '../../components/Avatar';
import { API_URL, avatars, clothes } from '../../constants';
import AccountContext from '../../contexts/AccountContext';

import House1 from "../../assets/story/start/house1.svg";
import House2 from "../../assets/story/start/house2.svg";
import House3 from "../../assets/story/start/house3.svg";
import DevelopmentalCover from "../../assets/categories/developmentalCover.png";
import AbnormalCover from "../../assets/categories/abnormalCover.png";
import IndustrialCover from "../../assets/categories/industrialCover.png";
import ModalContext from '../../contexts/ModalContext';
import axios from 'axios';

const startStory = [
  { bg: House1, text: "It's the night before your psychology board exam" },
  {
    bg: House1,
    text: "You've studied all day. Your mind is heavy with theories, theorists, terms, and timelines…",
  },
  {
    bg: House2,
    effectStyle: { backgroundColor: "rgba(0,0,0,0.9)", zIndex: 3 },
    timer: 1,
  },
  {
    bg: House3,
    effectStyle: { backgroundColor: "rgba(255,255,255,0.8)", zIndex: 3 },
    timer: 0.8,
  },
  {
    bg: House3,
    text: "You have crossed into Mindify — a world shaped by your own knowledge.",
  },
  {
    bg: House3,
    text: "To awaken fully prepared for the board exam, you must conquer the five worlds of your mind.",
  },
  {
    bgImage: DevelopmentalCover,
    text: "Every step unveils a new truth.",
    effectStyle: { backgroundColor: "rgba(0,0,0,0.6)", zIndex: 2 },
  },
  {
    bgImage: AbnormalCover,
    text: "Only the brave uncover the mind's depths.",
    effectStyle: { backgroundColor: "rgba(0,0,0,0.6)", zIndex: 2 },
  },
  {
    bgImage: IndustrialCover,
    text: "Every decision shapes your journey.",
    effectStyle: { backgroundColor: "rgba(0,0,0,0.6)", zIndex: 2 },
  },
  {
    bg: House3,
    text: "Which path will you face first?",
  },
];

const Story = (props) => {
  const {setModal} = useContext(ModalContext);
  const { setAccountData } = useContext(AccountContext)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [story, setStory] = useState(startStory[currentIndex]);
  const nav = useNavigation();
  useEffect(() => {
    const backAction = () => {
      
      if(nav.canGoBack()){
        nav.goBack();
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove();
  }, []);

  const onNext= () => {
    if(currentIndex + 1 === startStory.length){
      setModal({
        mode: "Tutorial-Worlds",
        secondaryFn: () => {
          setModal(null);
          removeTutorial();
        },
        background: "darker",
      });
      nav.goBack();
    }
    setCurrentIndex(current => current + 1);
    setStory(startStory[currentIndex + 1])
    console.log("nexted");
    
  }
  const removeTutorial = async () => {
      try {
        const {data} = await axios.get(API_URL + "/removeTutorial?user_id="+accountData._id+"&tutorial=worlds");
        setAccountData(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }

  useEffect(() => {
    if(!story.timer) return;
    // eslint-disable-next-line no-undef
    const a = setInterval(() => {
      console.log("Checked");
      onNext();
        // eslint-disable-next-line no-undef
        clearInterval(a);
        return;
    }, story.timer * 1000);
    // eslint-disable-next-line no-undef
    return () => clearInterval(a);
  }, [story]);


  const {accountData} = useContext(AccountContext)
  const Head = avatars.find((avatar) => avatar.id === accountData.avatar).body;
  const Cloth = clothes.find(cloth => cloth.id === accountData.cloth).image;
  return (
    <View style={{ backgroundColor: "#3D70C9", flex: 1 }}>
      <ImageBackground
        source={story.bgImage || null}
        style={[{ flex: 1, zIndex:0 }]}
        resizeMode="cover"
        resizeMethod="scale"
      >
        <View
          style={[
            {
              position: "absolute",
              top: 0,
              height: "100%",
              width: "100%",
            },
            story.effectStyle,
          ]}
        ></View>
        <Pressable
          onPress={() => onNext()}
          style={[
            {
              backgroundColor: "rgba(0,0,0,0.1)",
              position: "absolute",
              top: 0,
              height: "100%",
              width: "100%",
              zIndex: 2,
            },
          ]}
        >
          <Avatar Head={Head} Cloth={Cloth} size={1.2} />
        </Pressable>
        <View style={{ flex: 1 }}>{story.bg && <story.bg></story.bg>}</View>
        {story.text && (
          <View
            style={{
              backgroundColor: "white",
              margin: 12,
              marginVertical: 24,
              padding: 12,
              borderRadius: 10,
              minHeight: 80,
              zIndex:5
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-Regular",
                fontWeight: 800,
                fontSize: 16,
              }}
            >
              <TypeWriter typing={1} maxDelay={20}>
                {story.text}
              </TypeWriter>
            </Text>
            <Text style={{marginTop:'auto', marginLeft:'auto', fontSize:10}}>Tap to continue</Text>
          </View>
        )}
      </ImageBackground>
    </View>
  );
}

export default Story