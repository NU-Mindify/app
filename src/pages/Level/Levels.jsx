import {
  View,
  Text,
  TouchableNativeFeedback,
  TouchableHighlight,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
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

const Levels = (props) => {
  const { categoryIndex, isMastery } = props.route.params;
  const nav = useNavigation();
  const { accountData, progressData } = useContext(AccountContext);
  const categoryProgress = progressData[isMastery ? 'mastery' : 'classic'][categoryIndex.id]
  
  return (
    <AppBackground source={categoryIndex.level_background}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: `${categoryIndex.primary_color}CC`,
          paddingHorizontal: 24,
          paddingVertical: 12,
        }}
      >
        <TouchableOpacity
          style={{ position: "absolute", left: 16 }}
          onPress={() => {
            nav.goBack();
          }}
        >
          <Text style={[styles.entryTitle, { color: "white", fontSize: 32 }]}>
            {"<"}
          </Text>
        </TouchableOpacity>
        <Text style={[styles.entryTitle, { color: "white" }]}>
          {categoryIndex.name.toUpperCase()}
        </Text>
      </View>
      <Image
        source={isMastery ? masteryBtn : classic}
        style={{ margin: "auto", height: 50 }}
        resizeMode="contain"
      />
      <View style={{ flex: 1 }}>
        {locations
          .find((location) => location.id === categoryIndex.id)
          .locations.map(({ level, position }, index) => (
            <LevelButton
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
        >
        </View>
      </View>
    </AppBackground>
  );
};

export default Levels;
