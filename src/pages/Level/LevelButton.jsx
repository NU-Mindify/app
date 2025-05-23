import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Pressable, Text } from 'react-native';
import Animated, { BounceIn } from 'react-native-reanimated';
import levelblue from '../../assets/level/levelblue.png';
import levelbluePressed from "../../assets/level/levelbluePressed.png";
import levelgray from '../../assets/level/levelgray.png';
import levelgrayPressed from '../../assets/level/levelgrayPressed.png';
import levelred from '../../assets/level/levelred.png';
import levelredPressed from "../../assets/level/levelredPressed.png";
import levelyellow from '../../assets/level/levelyellow.png';
import levelyellowPressed from '../../assets/level/levelyellowPressed.png';
import ModalContext from '../../contexts/ModalContext';

const LevelButton = ({
  details: {level, position, items, time},
  state,
  index,
  categoryIndex,
  isMastery,
  setLeaderboardLevel
}) => {
  const [isPressing, setIsPressing] = useState(true);
  const { modal, setModal } = useContext(ModalContext);
  const nav = useNavigation();

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
  const showModal = () => {
    if (state === "soon") return;
    setModal({
      subtitle: `Level ${level}`,
      primaryFn: () => {
        nav.replace("Game", {
          level,
          levelIndex: index,
          categoryIndex,
          isMastery,
        });
        setModal(null);
      },
      secondaryFn: () => {
        setModal(null);
      },
      body: `Difficulty: \t\t\t\t\t${
        level === "?" ? "Hard" : level < 3 ? "Easy" : "Average"
      }
      \nQuestions: \t\t\t\t\t ${items} items
      \nTime per item:\t\t\t\t\t ${time} seconds`,
      mode: "LevelSelect",
      onLeaderboard: () => {
        setLeaderboardLevel(level);
        setModal(null);
      },
      colors: {
        primary_color: categoryIndex.primary_color,
        secondary_color: categoryIndex.secondary_color
      }
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
      onPress={showModal}
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
            position:'absolute',
            bottom: -14
          }}
        >
          {level}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

export default LevelButton