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
import X from "../../assets/generic/x.svg";
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
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <LevelTitle style={{ marginHorizontal: "auto" }} />
        <Text
          style={[
            styles.entryTitle,
            {
              position: "absolute",
              top: 0,
              left: "50%",
              transform: [{ translateX: "-50%" }],
              textAlign: "center",
              width: "80%",
              marginTop: 32,
            },
          ]}
        >
          {categoryIndex.name}
        </Text>
        <Image
          source={isMastery ? masteryBtn : classic}
          style={{ position: "absolute", bottom: -50, margin: "auto" }}
        />
      </View>
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
          <Animated.View
            entering={SlideInDown.delay(200)}
            exiting={SlideOutDown}
            style={[
              {
                marginHorizontal: "auto",
                backgroundColor: "#00000044",
                borderTopStartRadius: 24,
                borderTopEndRadius: 24,
                padding: 12,
                paddingBottom: 24,
                borderWidth: 2,
              },
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                nav.goBack();
              }}
            >
              <X width={42} height={42} />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </AppBackground>
  );
};

export default Levels;
