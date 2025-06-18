import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useEffect, useRef } from "react";
import Animated, {
  BounceIn,
  FadeOut,
  FlipInEasyX,
  FlipInXDown,
  FlipOutEasyX,
  PinwheelIn,
} from "react-native-reanimated";
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
import LottieView from "lottie-react-native";
import { Sound } from "./Game";
import { ArrowRight, ArrowRightCircle, ArrowRightFromLine, RotateCcw } from "lucide-react-native";
import BronzeStar from "../../assets//results/bronze_star.svg";
import SilverStar from "../../assets//results/silver_star.svg";
import GoldStar from "../../assets//results/gold_star.svg";
import NoStar from "../../assets//results/no_star.svg";

const Results = ({ stats, onReview, onLeaderboard }) => {
  const {isMastery, categoryIndex, level, mode, levelIndex} = useContext(GameContext)
  const nav = useNavigation();

  const duration = Math.floor(moment.duration(stats.endTime.diff(stats.startTime)).asSeconds());
  const totalQuestions = stats.correct + stats.wrong;
  const score = stats.correct * ((20 * totalQuestions) - duration);
  const isPass = stats.correct >= Math.floor(totalQuestions * 0.8);
  const is1Star = stats.correct >= Math.floor(totalQuestions * 0.8);
  const is2Star = stats.correct >= Math.floor(totalQuestions * 0.9);
  const is3Star = stats.correct >= Math.floor(totalQuestions * 1);
  const getStarsCount = (correct, totalQuestions) => {
    return is3Star ? 3 : is2Star ? 2 : is1Star ? 1 : 0;
  }
  const stars = getStarsCount(stats.correct, totalQuestions)
  console.log({
    star1: Math.floor(totalQuestions * 0.8),
    star2: Math.floor(totalQuestions * 0.9),
    star3: Math.floor(totalQuestions * 1),
  });

  const animRef = useRef(null);

  const { playSound } = Sound();
  useEffect(() => {
    if (isPass) {
      playSound(require("../../audio/complete.mp3"));
    } else {
      animRef?.current?.play(0, 54)
      playSound(require("../../audio/lose.mp3"));
    }
  }, [])

  const { accountData } = useContext(AccountContext);
  const Avatar = avatars[accountData.avatar];
  const {primary_color, secondary_color} = categoryIndex
  return (
    <>
      <View style={{ alignItems: "center" }}>
        <Title
          title={is1Star ? "COMPLETED" : "FAILED"}
          colors={{ primary_color, secondary_color }}
        />
        {/* Results */}
        <Animated.View
          style={[
            {
              justifyContent: "center",
              alignItems: "center",
              width: "90%",
              backgroundColor: "white",
              padding: 12,
              gap: 4,
              borderRadius: 12,
            },
          ]}
          entering={BounceIn}
          exiting={FadeOut}
        >
          <Text
            style={{
              fontFamily: "LilitaOne-Regular",
              color: "black",
              fontSize: 24,
              textShadowRadius: 4,
            }}
          >
            Level {level}
          </Text>
          {/* Result/Star Container */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: "#1C4384",
              borderRadius: 24,
              width: "80%",
              padding: 24,
              paddingHorizontal: 12,
            }}
          >
            {/* Star Container */}
            {mode !== "review" && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 130,
                  width: "100%",
                }}
              >
                <SmallStar
                  style={{ left: 0 }}
                  isActive={is1Star}
                  delay={400}
                  star={stars}
                />
                {/* <BigStar  isActive={is3Star} /> */}
                <SmallStar star={stars} style={{ top: 0 }} isActive={is3Star} />
                <SmallStar
                  style={{ right: "0" }}
                  isActive={is2Star}
                  delay={800}
                  star={stars}
                />
              </View>
            )}
            <Text
              style={[
                {
                  fontFamily: "LilitaOne-Regular",
                  color: secondary_color || "white",
                  fontSize: 38,
                  textShadowColor: secondary_color,
                  textShadowRadius: 8,
                  textAlign: "center",
                },
              ]}
            >
              {is3Star
                ? "PERFECT SCORE!"
                : is1Star
                ? "WELL DONE!"
                : "TRY AGAIN"}
            </Text>
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
                paddingHorizontal: 12,
              }}
            >
              You've scored
              {/* <Text style={{ fontWeight: 900, fontSize: 18 }}>{` ${
                score > 0 ? "+" : ""
              }${score} `}</Text> */}
              <Text
                style={{ fontWeight: 900, fontSize: 18 }}
              >{` ${stats.correct} `}</Text>
              out of {stats.correct + stats.wrong} in
              <Text style={{ fontWeight: 900, fontSize: 18, color: "black" }}>
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
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 8,
              marginBottom: 32,
            }}
          >
            {mode !== "review" && (
              <Button
                onPress={onLeaderboard}
                text={"Leaderboard"}
                style={{ zIndex: 10 }}
              />
            )}
            {mode === "review" && <Button onPress={onReview} text={"Review"} />}
          </View>
          <View
            style={{
              position: "absolute",
              bottom: -20,
              gap: 12,
              flexDirection: "row",
            }}
          >
            <Button
              onPress={() =>
                nav.replace("Game", {
                  level,
                  levelIndex,
                  categoryIndex,
                  isMastery,
                  mode,
                })
              }
              // text={isPass ? "Next Level" : "Try Again"}
              text={
                <RotateCcw size={32} color={"white"} style={{ zIndex: 5 }} />
              }
              style={{ zIndex: 10, paddingHorizontal: 12 }}
            />
            <Button
              onPress={() =>
                nav.replace("Levels", {
                  categoryIndex,
                  isMastery,
                  selectedMode: mode,
                })
              }
              text={
                <ArrowRightCircle
                  size={32}
                  color={"white"}
                  style={{ zIndex: 5 }}
                />
              }
              style={{ zIndex: 10, paddingHorizontal: 12 }}
            />
          </View>
        </Animated.View>
        <LottieView
          style={{
            position: "absolute",
            margin: "auto",
            width: 720,
            height: "70%",
            top: 60,
            zIndex: 1,
          }}
          ref={animRef}
          source={
            is1Star
              ? require("../../anim/confetti.json")
              : require("../../anim/sadDefeat.json")
          }
          autoPlay
          loop={is1Star}
        />
      </View>
    </>
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
        borderColor: color || "#FFC300",
        justifyContent: "center",
        alignItems: "center",
        width: "32%",
      }}
    >
      <Text style={{ fontSize: 32, fontWeight: 900, color:'black' }}>{stat}</Text>
      <Text style={{ fontSize: 12, fontWeight: 500 }}>{label}</Text>
    </View>
  );
};
const SmallStar = ({ style, isActive, delay, star }) => {
  const StarColor = star === 3 ? GoldStar : star === 2 ? SilverStar : star === 1 ? BronzeStar : NoStar
  const Star = isActive ? StarColor : NoStar
  return (
    <Animated.View
      entering={isActive ? PinwheelIn.springify().delay(delay) : undefined}
      style={[
        style,
        {
          height: 80,
          width: 80,
          position: "absolute",
        },
      ]}
    >
      <Star height={80} width={80} />
    </Animated.View>
  );
};
const SmallStars = ({ style, isActive, delay }) => {
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

export const Title = ({ title, colors }) => {
  return (
    <Animated.View
      entering={FlipInXDown.delay(200)}
      style={[
        style.outer,
        style.title,
        colors && {
          borderColor: colors.secondary_color,
          backgroundColor: colors.secondary_color,
        },
      ]}
    >
      <Text
        style={[
          {
            fontFamily: "LilitaOne-Regular",
            color: "white",
            fontSize: 36,
            textAlign: "center",
          },
        ]}
      >
        {title}
      </Text>
    </Animated.View>
  );
}
const style = StyleSheet.create({
  outer: {
    borderRadius: 24,
    borderColor: "#FDD116",
    borderWidth: 8,
    backgroundColor: "#FDD116",
  },
  inner: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#35408E",
    padding: 10,
    paddingTop: 0,
    borderRadius: 24,
    borderColor: "#2D3A72",
    borderWidth: 8,
  },
  title: {
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
    padding: 8,
    paddingHorizontal: 32,
    backgroundColor: "#35408E",
    borderBottomWidth: 0,
  },
});
