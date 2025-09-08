import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Animated, { BounceIn, FadeIn, FadeOut } from 'react-native-reanimated';
import levelblue from '../../assets/level/levelblue.png';
import levelbluePressed from "../../assets/level/levelbluePressed.png";
import levelgray from '../../assets/level/levelgray.png';
import levelgrayPressed from '../../assets/level/levelgrayPressed.png';
import levelred from '../../assets/level/levelred.png';
import levelredPressed from "../../assets/level/levelredPressed.png";
import levelyellow from '../../assets/level/levelyellow.png';
import levelyellowPressed from '../../assets/level/levelyellowPressed.png';
import ModalContext from '../../contexts/ModalContext';
import smallStar from "../../assets/results/smallStar.png";
import smallStarEmpty from "../../assets/results/smallStarEmpty.png";
import bigStar from "../../assets/results/bigStar.png";
import bigStarEmpty from "../../assets/results/bigStarEmpty.png";
import AccountContext from '../../contexts/AccountContext';
import { avatars, numberOfItems } from '../../constants';
import BronzeStar from "../../assets//results/bronze_star.svg";
import SilverStar from "../../assets//results/silver_star.svg";
import GoldStar from "../../assets//results/gold_star.svg";
import NoStar from "../../assets//results/no_star.svg";
import { Pressable } from 'react-native-gesture-handler';

const LevelButton = ({
  onStory,
  details: {level, position, items, time},
  state,
  index,
  categoryIndex,
  isMastery,
  mode,
  setLeaderboardLevel,
  stars
}) => {
  const [isPressing, setIsPressing] = useState(true);
  const { modal, setModal } = useContext(ModalContext);
  const { accountData } = useContext(AccountContext)
  const nav = useNavigation();
  const Avatar = avatars.find(avatar => avatar.id === accountData.avatar).head;

  const getSource = () => {
    switch (state) {
      case "current":
        return isPressing ? levelyellowPressed : levelyellow;
      case "soon":
        return isPressing ? levelgrayPressed : levelgray;
      case "done":
        return isPressing ? levelbluePressed : levelblue;
      case "boss":
        return isPressing ? levelredPressed : levelred;
      default:
        break;
    }
  };
  const onLevelPress = () => {
    if (state === "soon") return;
    onStory(showModal, index);
  }
  const showModal = () => {
    setModal({
      subtitle: `Level ${level}`,
      primaryFn: () => {
        nav.replace("Game", {
          level,
          levelIndex: index,
          categoryIndex,
          isMastery,
          mode,
        });
        setModal(null);
      },
      secondaryFn: () => {
        setModal(null);
      },
      onRepeatStory: () => onStory(showModal, index, false),
      gameMode: mode,
      difficulty: level === "?" ? "Hard" : level < 3 ? "Easy" : "Average",
      items: numberOfItems[categoryIndex.id][level].items,
      timer: time,
      mode: "LevelSelect",
      onLeaderboard: () => {
        setLeaderboardLevel(level);
        setModal(null);
      },
      colors: {
        primary_color: categoryIndex.primary_color,
        secondary_color: categoryIndex.secondary_color,
      },
    });
  };

  useEffect(() => {
    // to prefetch pressed image
    setIsPressing(false);
  }, []);
  return (
    <Pressable
      style={[
        {
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
        },
        position,
      ]}
      onPressIn={() => setIsPressing(true)}
      onPressOut={() => setIsPressing(false)}
      onPress={() => onLevelPress()}
    >
      <Animated.View
        entering={BounceIn.delay(200 * index)}
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: 48,
          height: 60,
        }}
      >
        {state === "done" && mode === "competition" && (
          <Animated.View
            style={{
              backgroundColor: "red",
              position: "absolute",
              top: -10,
              zIndex: 4,
              width: 80,
            }}
            entering={FadeIn}
            exiting={FadeOut}
          >
            <SmallStar star={stars} isActive={stars >= 1} style={{ left: 0 }} />
            <SmallStar
              star={stars}
              isActive={stars >= 3}
              style={{
                position: "absolute",
                left: "50%",
                transform: [{ translateX: "-50%" }],
                top: -20,
              }}
            />
            <SmallStar
              star={stars}
              isActive={stars >= 2}
              style={{ right: 0 }}
            />
            {/* <BigStar isActive={stars >= 3} />
          <SmallStar style={{right: 0}} isActive={stars >= 2} /> */}
          </Animated.View>
        )}
        {state === "current" && (
          <View
            style={{
              position: "absolute",
              top: -40,
              zIndex: 4,
              backgroundColor: "white",
              padding: 4,
              borderRadius: 24,
              borderWidth: 4,
            }}
          >
            <Avatar height={40} width={40} />
          </View>
        )}
        <Animated.Image
          source={getSource()}
          style={{ width: 100, height: 100 }}
          resizeMode="contain"
        />
        <Text
          style={{
            color: "white",
            fontWeight: 900,
            fontSize: 32,
            position: "absolute",
            bottom: -14,
            textShadowColor: "black",
            textShadowRadius: 8,
          }}
        >
          {level}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

export default LevelButton;


const SmallStar = ({ style, isActive, delay, star }) => {
  const StarColor = star >= 3 ? GoldStar : star >= 2 ? SilverStar : star >= 1 ? BronzeStar : NoStar
  const Star = isActive ? StarColor : NoStar
  return (
    <Animated.View
      source={Star}
      style={[
        style,
        {
          height: 38,
          width: 38,
          position: "absolute",
        },
      ]}
    >
      <Star height={32} width={32} />
    </Animated.View>
  );
};

const BigStar = ({ isActive }) => {
  return (
    <Animated.Image
      source={isActive ? bigStar : bigStarEmpty}
      style={{
        height: 48,
        width: 48,
        position: "absolute",
        left:'50%',
        transform:[{translateX:'-50%'}],
        top:-20
      }}
    />
  );
};