import { View, Text, StyleSheet, Pressable, ImageBackground } from "react-native";
import React, { useContext, useRef, useState } from "react";
import TypeWriter from "react-native-typewriter";
import Avatar from "../../components/Avatar";
import AccountContext from "../../contexts/AccountContext";
import { API_URL, avatars, clothes } from "../../constants";
import Animated, {
  FadeInDown,
  FadeOutDown,
} from "react-native-reanimated";
import stories from "./story.json";
import developmental from '../../assets/story/bg/developmental.png'
import abnormal from "../../assets/story/bg/abnormal.png";
import psychological from "../../assets/story/bg/psychological.png";
import industrial from "../../assets/story/bg/industrial.png";
import general from "../../assets/story/bg/general.png";

const bg = {
  abnormal: abnormal,
  developmental: developmental,
  psychological: psychological,
  industrial: industrial,
  general: general,
};

const MajorStory = ({ data }) => {
  const {onClose, category, difficulty} = data

  const { accountData } = useContext(AccountContext);
  const Head = avatars.find((avatar) => avatar.id === accountData.avatar).body;
  const Cloth = clothes.find((cloth) => cloth.id === accountData.cloth).image;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [levelStoryObj, setLevelStory] = useState();
  const [story, setStory] = useState(null);
  console.log(story);

  const onNext = async () => {
    if (currentIndex + 1 >= levelStoryObj.length) {
      onClose();
    }
    setStory(levelStoryObj[currentIndex + 1]);
    setCurrentIndex((current) => current + 1);
  };

  useState(() => {
    const storyObj = stories?.[category]?.[difficulty] || null;
    if (!storyObj) {
      onClose();
      return;
    }
    setLevelStory(storyObj);
    setStory(storyObj[0]);
  }, [story, levelStoryObj, onClose]);
  if (!story) return;
  if (!levelStoryObj) {
    return;
  }
  return (
    <Animated.View
      entering={FadeInDown}
      exiting={FadeOutDown}
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
      <ImageBackground
        source={bg[category] || null}
        style={[{ zIndex: 0, height:'100%', position:'absolute', left:0, top:0, width:'100%'}]}
        resizeMode="cover"
      ></ImageBackground>
      <Animated.View
        entering={FadeInDown.delay(500)}
        style={[
          {
            position: "absolute",
            bottom: 0,
            height: "75%",
            width: "100%",
            zIndex: 2,
          },
        ]}
      >
        <Avatar Head={Head} Cloth={Cloth} size={1.4} />
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
            <TypeWriter typing={1} maxDelay={20}>
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

export default MajorStory;

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: "white",
    margin: 12,
    marginVertical: 24,
    padding: 12,
    borderRadius: 10,
    minHeight: 80,
    zIndex: 10,
    borderWidth: 1,
    marginTop:'auto'
  },
});
