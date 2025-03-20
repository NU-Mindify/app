import { View, Text } from "react-native";
import React, { useContext } from "react";
import Animated, {
  BounceIn,
  FadeOut,
  FlipInEasyX,
  FlipOutEasyX,
  PinwheelIn,
} from "react-native-reanimated";
import styles from "../../styles/styles";
import Completed from "../../assets/results/completed.png";
import { useNavigation } from "@react-navigation/native";
import smallStar from "../../assets/results/smallStar.png";
import smallStarEmpty from "../../assets/results/smallStarEmpty.png";
import bigStar from "../../assets/results/bigStar.png";
import bigStarEmpty from "../../assets/results/bigStarEmpty.png";
import Button from "../../components/Button";
import AccountContext from "../../contexts/AccountContext";
import { avatars } from "../../constants";
import moment from "moment";
import GameContext from "../../contexts/GameContext";

const Results = ({ stats, onReview }) => {
  const {isMastery, categoryIndex} = useContext(GameContext)
  const nav = useNavigation();

  const duration = moment(stats.endTime).subtract(stats.startTime).format("s");
  const score = stats.correct * (60 - duration);
  const totalQuestions = stats.correct + stats.wrong;
  const isPass = stats.correct >= Math.floor(totalQuestions * 0.8);
  const is1Star = stats.correct >= Math.floor(totalQuestions * 0.8);
  const is2Star = stats.correct >= Math.floor(totalQuestions * 0.9);
  const is3Star = stats.correct >= Math.floor(totalQuestions * 1);
  console.log({
    star1: Math.floor(totalQuestions * 0.8),
    star2: Math.floor(totalQuestions * 0.9),
    star3: Math.floor(totalQuestions * 1),
  });

  const { accountData } = useContext(AccountContext);
  const Avatar = avatars[accountData.avatar];

  return (
    <View style={{ alignItems: "center" }}>
      {/* --Completed-- Banner */}
      <Animated.Image
        source={Completed}
        style={{ position: "absolute", top: -40, width: "100%", zIndex: 2 }}
        entering={FlipInEasyX}
        exiting={FlipOutEasyX}
        resizeMode={"contain"}
      />

      {/* Results */}
      <Animated.View
        style={[
          styles.entryBackground,
          { width: "90%", paddingHorizontal: 8, borderColor: "#caa52c" },
        ]}
        entering={BounceIn}
        exiting={FadeOut}
      >
        {/* Result/Star Container */}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#1C4384",
            borderRadius: 24,
            width: "80%",
            padding: 24,
            paddingHorizontal: 12,
            margin: 24,
            marginTop: 55,
            paddingTop: 70,
          }}
        >
          {/* Star Container */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: 130,
              width: "100%",
              position: "absolute",
              top: "-15%",
            }}
          >
            <SmallStar style={{ left: 0 }} isActive={is1Star} delay={400} />
            <BigStar isActive={is3Star} />
            <SmallStar style={{ right: "0" }} isActive={is2Star} delay={800} />
          </View>
          {/* Profile */}
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 99,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 8,
              borderColor: "#FFD41C",
              width: 120,
              height: 120,
            }}
          >
            <Avatar />
          </View>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 900,
              color: "white",
              paddingBottom: 12,
            }}
          >
            {accountData.username}
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: "white",
              textAlign: "center",
              paddingHorizontal: 12,
            }}
          >
            You've scored
            <Text
              style={{ fontWeight: 900, fontSize: 18, color: "yellow" }}
            >{` ${score > 0 ? "+" : ""}${score} `}</Text>
            points in
            <Text style={{ fontWeight: 900, fontSize: 18, color: "white" }}>
              {` ${duration} `}
            </Text>
            seconds
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          <ResultsStats
            stat={stats.correct + stats.wrong}
            label={"Questions"}
          />
          <ResultsStats
            stat={stats.correct}
            label={"Correct"}
            color={"green"}
          />
          <ResultsStats stat={stats.wrong} label={"Wrong"} color={"red"} />
        </View>

        <View
          style={{ flexDirection: "row", justifyContent: "center", gap: 8 }}
        >
          <Button
            onPress={() => nav.replace("Levels", { categoryIndex, mastery: isMastery })}
            text={isPass ? "Next Level" : "Try Again"}
          />
          {!isMastery && <Button onPress={onReview} text={"Review"} />}
        </View>
      </Animated.View>
      {/* <View>
        <Animated.View style={styles.entryBackground}>
          <Text>asd</Text>
        </Animated.View>
      </View> */}
    </View>
  );
};

export default Results;

const ResultsStats = ({ label, stat, color }) => {
  return (
    <View
      style={{
        padding: 8,
        backgroundColor: "#F6EDC6",
        borderRadius: 12,
        borderWidth: 8,
        borderColor: "#FFC300",
        justifyContent: "center",
        alignItems: "center",
        width: "32%",
      }}
    >
      <Text style={{ fontSize: 32, fontWeight: 900, color }}>{stat}</Text>
      <Text style={{ fontSize: 12, fontWeight: 500 }}>{label}</Text>
    </View>
  );
};

const SmallStar = ({ style, isActive, delay }) => {
  return (
    <Animated.Image
      source={isActive ? smallStar : smallStarEmpty}
      style={[
        style,
        {
          height: 80,
          width: 80,
          position: "absolute",
        },
      ]}
      entering={isActive ? PinwheelIn.springify().delay(delay) : undefined}
    />
  );
};

const BigStar = ({ isActive }) => {
  return (
    <Animated.Image
      source={isActive ? bigStar : bigStarEmpty}
      style={{
        height: 128,
        width: 128,
        position: "absolute",
        top: -30,
      }}
      entering={isActive ? PinwheelIn.springify().delay(1000) : undefined}
    />
  );
};
