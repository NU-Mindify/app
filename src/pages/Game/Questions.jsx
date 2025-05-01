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
      {/* <Text>Progress Bar</Text>
      <View style={{ backgroundColor: "white", flex: 1, width: "80%" }}>
        <Text>
          QUESTION {number + 1} / {length}
        </Text>
        <Text>{data.question}</Text>
        <Text>______________________________</Text>
        {data.choices.map((choice, index) => (
          <View style={{ borderColor: "#E48238" }}>
            <Text></Text>
          </View>
        ))}
      </View> */}
      {/*------------------------------  QUESTION CARD ----------------------------------*/}
      <Animated.View
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
      </Animated.View>

      {/*------------------------------ MGA CHOICES ----------------------------------*/}
      <View style={QuesStyles.choicesMainCont}>
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
      </View>
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
