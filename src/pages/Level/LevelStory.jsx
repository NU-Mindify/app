import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import TypeWriter from 'react-native-typewriter';
import Avatar from '../../components/Avatar';
import AccountContext from '../../contexts/AccountContext';
import { API_URL, avatars, clothes } from '../../constants';
import Animated, { FadeInDown, SlideInDown, SlideInUp } from 'react-native-reanimated';
import stories from "./story.json"
import axios from 'axios';
import { useAudioPlayer } from 'expo-audio';

const LevelStory = ({ onClose, levelSelected, category }) => {
  const { accountData } = useContext(AccountContext);
  const Head = avatars.find((avatar) => avatar.id === accountData.avatar).body;
  const Cloth = clothes.find((cloth) => cloth.id === accountData.cloth).image;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [levelStoryObj, setLevelStory] = useState()
  const [story, setStory] = useState(null);
  const typing = useAudioPlayer(require("../../audio/typing.wav"))
  typing.loop = true;
  console.log(story);
  
  const onNext = async () => {
    if (currentIndex + 1 >= levelStoryObj.length -1) {
      onClose();
    }
    setStory(levelStoryObj[currentIndex + 1]);
    setCurrentIndex((current) => current + 1);
    typing.play()
  };

  useState(() => {
    const storyObj = stories?.[category]?.[levelSelected] || null;
    if (!storyObj) {
      onClose();
      return;
    }
    setLevelStory(storyObj);
    setStory(storyObj[0]);
    typing.play();
  }, [story, levelStoryObj, onClose]);
  if (!story) return;
  if(!levelStoryObj){
    return;
  }
  return (
    <Animated.View
      entering={FadeInDown}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        backgroundColor: "#00000030",
        top: 0,
        zIndex: 10,
      }}
    >
      <Pressable
        onPress={() => onNext()}
        style={[
          {
            position: "absolute",
            top: 0,
            height: "100%",
            width: "100%",
            zIndex: 100,
          },
        ]}
      ></Pressable>
      <View style={{ flex: 1 }}></View>
      <Animated.View
        entering={FadeInDown.delay(500)}
        style={[
          {
            position: "absolute",
            bottom: 32,
            zIndex: 2,
          },
        ]}
      >
        <Avatar Head={Head} Cloth={Cloth} size={1} />
      </Animated.View>
      {story.text && (
        <View style={styles.textContainer}>
          <Text
            style={{
              fontFamily: "Poppins-Regular",
              fontWeight: 800,
              fontSize: 16,
            }}
          >
            <TypeWriter typing={1} maxDelay={20} onTypingEnd={() => typing.pause()}>
              {story.text}
            </TypeWriter>
          </Text>
          <Text style={{ marginTop: "auto", marginLeft: "auto", fontSize: 10 }}>
            Tap anywhere to continue.
          </Text>
        </View>
      )}
    </Animated.View>
  );
};

export default LevelStory

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: "white",
    margin: 12,
    marginVertical: 24,
    padding: 12,
    borderRadius: 10,
    minHeight: 80,
    zIndex: 5,
    borderWidth:1,
  },
});