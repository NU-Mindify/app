import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { BounceIn, SlideInLeft, ZoomIn, ZoomOut } from "react-native-reanimated";
import abnormalTitle from "../../assets/questions/abnormalTitle.png";
import choicesCard from "../../assets/questions/choicesCard.png";
import questionCard from "../../assets/questions/questionCard.png";
import questionNumber from "../../assets/questions/questionNumber.png";
import { useContext } from "react";
import GameContext from "../../contexts/GameContext";

export default function Questions({ data, onAnswer, number, length }) {
  const { level } = useContext(GameContext);
  return (
    <>
      <Text>Progress Bar</Text>
      <Animated.ScrollView
        entering={BounceIn}
        style={{
          flex: 1,
          marginBottom: 24,
          borderRadius: 18,
          width: "90%",
          margin: "auto",
        }}
        contentContainerStyle={{
          backgroundColor: "white",
          padding: 18,
          justifyContent: "flex-start",
          borderRadius: 18,
          margin: 'auto'
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontFamily: "LilitaOne-Regular",
            textAlign: "center",
          }}
        >
          QUESTION {number + 1} / {length}
        </Text>
        <View style={{ padding: 12 }}>
          <Text style={{ fontSize:16, textAlign: "center", fontFamily: "Poppins-Medium" }}>
            {data.question}
          </Text>
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
                  borderColor: "#248552",
                  backgroundColor: "#248552",
                  borderWidth: 4,
                  borderRadius: 8,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    backgroundColor: "#FBF0CB",
                    borderColor: "#3B3F2A",
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
      <View style={{ flex: 0, justifyContent: "flex-end" }} />
      {/*------------------------------  QUESTION CARD ----------------------------------*/}
      {/* <Animated.View
        style={[QuesStyles.quesCont, { marginBottom: 20 }]}
        entering={ZoomIn}
        exiting={ZoomOut}
      >
        <Animated.Image
          source={questionNumber}
          style={[
            QuesStyles.quesCardStyle,
            {
              zIndex: 2,
              top: -10,
            },
          ]}
        />
        <Text
          style={{
            zIndex: 3,
            textAlign: "center",
            top: 4,
            fontWeight: 900,
            fontSize: 18,
            color: "white",
            position: "absolute",
          }}
        >
          QUESTION {number + 1} / {length}
        </Text>
        <Animated.Image
          source={questionCard}
          style={QuesStyles.quesCardStyle}
        />
        <Animated.View style={QuesStyles.scrollCont}>
          <ScrollView
            style={QuesStyles.scrollStyle}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <Text
              style={{
                textAlign: "center",
                width: "100%",
                flexWrap: "wrap",
                fontSize: 24,
              }}
            >
              {data.question}
            </Text>
          </ScrollView>
        </Animated.View>
      </Animated.View> */}

      {/*------------------------------ MGA CHOICES ----------------------------------*/}
      {/* <View style={QuesStyles.choicesMainCont}>
        {data.choices.map((choice, index) => (
          <TouchableOpacity
            key={index}
            style={QuesStyles.choicesCardCont}
            onPress={() => {
              onAnswer(choice);
            }}
          >
            <Animated.View
              style={QuesStyles.animChoicesCardCont}
              entering={SlideInLeft.delay(200 + index * 100)}
            >
              <Animated.Image
                source={choicesCard}
                style={QuesStyles.choicesCardStyle}
              />
              <Text style={QuesStyles.choicesText}>
                {choice.letter.toUpperCase()}. {choice.text}
              </Text>
            </Animated.View>
          </TouchableOpacity>
        ))}
      </View> */}
    </>
  );
}

export const QuesStyles = StyleSheet.create({
  mainCont: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
  },

  levelTitleStyle: {
    width: "90%",
    resizeMode: "contain",
  },

  quesCont: {
    width: "100%",
    height: 400,
    justifyContent: "center",
    alignItems: "center",
  },

  quesCardStyle: {
    width: "100%",
    resizeMode: "contain",
    position: "absolute",
  },

  scrollCont: {
    width: "75%",
    height: "65%",
    top: "2%",
  },

  scrollStyle: {
    width: "100%",
    backgroundColor: "#F9EBDE",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    borderRadius: 10,
  },

  choicesCardCont: {
    width: "100%",
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
  },

  animChoicesCardCont: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  choicesCardStyle: {
    width: "100%",
    resizeMode: "contain",
    position: "absolute",
  },

  choicesText: {
    color: "white",
    fontWeight: 900,
    fontSize: 14,
    width:'80%',
    textAlign:'center'
  },

  choicesMainCont: {
    top: "-3%",
    width: "100%",
    height: "38%",
  },

  resultMainBg: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(128, 128, 128, 0.5)",
  },
});
