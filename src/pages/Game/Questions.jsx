import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { BounceIn, FadeInDown, SlideInLeft } from "react-native-reanimated";
import { useContext, useEffect, useRef } from "react";
import GameContext from "../../contexts/GameContext";
import { gameColors } from "../../constants";
import LottieView from "lottie-react-native";
import fireAnimation from '../../anim/Fire.json'

export default function Questions({ data, onAnswer, number, length, streak, mode }) {
  const { level, categoryIndex } = useContext(GameContext);
  const animationRef = useRef(null);

  useEffect(()=> {
    if(streak < 5) {
      animationRef.current.pause()
    }else{
      animationRef.current.play()
    }
  }, [streak])

  console.log(data.answer);

  return (
    <>
      <Animated.View style={questStyle.scrollView} entering={FadeInDown}>
        {mode === "mastery" && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor:'white',
                marginHorizontal:'auto',
                borderRadius:12,
                padding: 4
              }}
            >
              <LottieView
                ref={animationRef}
                style={{
                  width: 42,
                  height: 42,
                  padding: 0,
                  filter: [{ grayscale: streak < 5 ? "100%" : "0" }],
                }}
                resizeMode="center"
                source={fireAnimation}
                autoPlay
                loop
              />
              {streak >= 5 && (
                <Text style={{ fontSize: 18, fontFamily: "LilitaOne-Regular", paddingRight:8 }}>
                  Streak: {streak}
                </Text>
              )}
            </View>
          )}
        <View
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            height: "50%",
            width: "100%",
            transform: [{ translateY: "-50%" }],
            backgroundColor: "#A1CDB6",
            borderRadius: 16,
          }}
        ></View>
        <Animated.ScrollView contentContainerStyle={[questStyle.scrollContent]}>
          <Text
            style={[
              questStyle.questionNum,
              { color: categoryIndex.primary_color },
            ]}
          >
            QUESTION {number + 1} / {length}
          </Text>
          <View style={{ padding: 12 }}>
            <Text style={[questStyle.question]}>{data.question}</Text>
          </View>

          <View style={{ gap: 8 }}>
            {data.choices.map((choice, index) => (
              <TouchableOpacity
                style={{}}
                key={index}
                onPress={() => onAnswer(choice)}
              >
                <Animated.View
                  entering={SlideInLeft.delay(200 + index * 100)}
                  style={{
                    borderColor:
                      gameColors[categoryIndex.id].answerBorder.outer,
                    backgroundColor:
                      gameColors[categoryIndex.id].answerBorder.outer,
                    borderWidth: 4,
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      backgroundColor: "#FBF0CB",
                      borderColor:
                        gameColors[categoryIndex.id].answerBorder.inner,
                      borderWidth: 4,
                      padding: 12,
                      borderRadius: 8,
                      fontFamily: "Poppins-Medium",
                    }}
                  >
                    {choice.letter.toUpperCase()}. {choice.text}
                  </Text>
                </Animated.View>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.ScrollView>
      </Animated.View>
      <View style={{ flex: 0, justifyContent: "flex-end" }} />
    </>
  );
}

export const questStyle = StyleSheet.create({
  scrollView: {
    flex: 1,
    marginBottom: 24,
    borderRadius: 18,
    margin: "auto",
    width: "90%",
  },
  scrollContent: {
    width: "90%",
    backgroundColor: "white",
    padding: 18,
    justifyContent: "flex-start",
    borderRadius: 18,
    margin: "auto",
  },
  questionNum: {
    fontSize: 28,
    fontFamily: "LilitaOne-Regular",
    textAlign: "center",
  },
  question: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Poppins-Medium",
  },
});
