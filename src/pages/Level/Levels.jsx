import {
  View,
  Text,
  TouchableNativeFeedback,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  StatusBar,
  ImageBackground,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useContext, useState, useEffect, useRef } from "react";
import AppBackground from "../../components/AppBackground";
import styles from "../../styles/styles";
import { useNavigation } from "@react-navigation/native";
import LevelButton from "./LevelButton";
import LevelTitle from "../../assets/level/levelTitle.svg";
import X from "../../assets/generic/X-White.svg";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import AccountContext from "../../contexts/AccountContext";
import locations from './locations.json'
import classic from '../../assets/modal/classic.png'
import masteryBtn from '../../assets/modal/mastery.png'
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowLeftCircle } from "lucide-react-native";
import Leaderboard from "../Game/Leaderboard";

const Levels = (props) => {
  const { categoryIndex, isMastery } = props.route.params;
  const { accountData, progressData } = useContext(AccountContext);
  const categoryProgress = progressData[isMastery ? 'mastery' : 'classic'][categoryIndex.id]
  
  const scrollViewRef = useRef();
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: false });
  }, []);

  const [leaderboardLevel, setLeaderboardLevel] = useState(null)

  if (leaderboardLevel) {
    return (
      <AppBackground source={categoryIndex.level_background}>
        <Leaderboard
          onExit={() => {
            setLeaderboardLevel(null)
          }}
          level={leaderboardLevel}
          categoryIndex={categoryIndex}
          isMastery={isMastery}
        />
      </AppBackground>
    );
  }

  return (
    <>
      <ScrollView
        stickyHeaderIndices={[0]}
        ref={scrollViewRef}
        inverted={true}
        style={{ height: Dimensions.get("screen").height, backgroundColor:`${categoryIndex.primary_color}` }}
        overScrollMode="never"
        scrollToOverflowEnabled={false}
        decelerationRate="fast"
        bounces={false}
      >
        <CategoryBar categoryIndex={categoryIndex} isMastery={isMastery} />
        <ImageBackground
          source={categoryIndex.level_background}
          style={[{ height: 1500, width: "100%" }]}
          resizeMode="cover"
          resizeMethod="scale"
        >
          <View style={{ flex: 1 }}>
            {locations
              .find((location) => location.id === categoryIndex.id)
              .locations.map(({ level, position }, index) => (
                <LevelButton
                  setLeaderboardLevel={(level) => setLeaderboardLevel(level)}
                  level={level}
                  position={position}
                  key={index}
                  categoryIndex={categoryIndex}
                  index={index}
                  isMastery={isMastery}
                  state={
                    level === "?" && categoryProgress === index
                      ? "boss"
                      : categoryProgress > index
                      ? "done"
                      : categoryProgress === index
                      ? "current"
                      : "soon"
                  }
                />
              ))}
            <View
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
              }}
            ></View>
          </View>
        </ImageBackground>
      </ScrollView>
    </>
  );
};

export default Levels;

const CategoryBar = ({categoryIndex, isMastery}) => {
  const nav = useNavigation();
  const insets = useSafeAreaInsets();
  const notchHeight = insets.top;
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        zIndex:5,
        paddingTop: notchHeight + 14,
        backgroundColor: `${categoryIndex.primary_color}CC`,
        paddingHorizontal: 24,
        paddingVertical: 12,
        flexDirection: "row",
        flex: 0
      }}
    >
      <TouchableOpacity
        style={{
          position: "absolute",
          left: 16,
          top: notchHeight + 6,
        }}
        onPress={() => {
          nav.goBack();
        }}
      >
        <ArrowLeftCircle size={32} color={"white"} />
      </TouchableOpacity>
      <Text style={[styles.entryTitle, { color: "white", fontSize: 24 }]}>
        {categoryIndex.name.toUpperCase()}
      </Text>
      <Image
        source={isMastery ? masteryBtn : classic}
        style={{
          margin: "auto",
          height: 40,
          position: "absolute",
          bottom: -45,
        }}
        resizeMode="contain"
      />
    </View>
  );
}