import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Pressable, ScrollView } from "react-native-gesture-handler";
import { XCircle } from "lucide-react-native";
import AppBackground from "../../components/AppBackground";
import styles from "../../styles/styles";
import { useNavigation } from "@react-navigation/native";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";

const Review = ({ questions, stats, onExit }) => {
  const nav = useNavigation();
  return (
    <Animated.View entering={ZoomIn} exiting={ZoomOut} style={{ flex: 1, padding: 28 }}>
      <View
        style={{
          backgroundColor: "#F9EBDE",
          flex: 1,
          borderRadius: 24,
          padding: 24,
          borderWidth: 8,
          borderColor: "#2E5A9F",
        }}
      >
        <View
          style={[
            styles.entryBackground,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 0,
            },
          ]}
        >
          <Text
            style={[styles.entryBody, { fontSize: 24, fontWeight: "bold" }]}
          >
            Review
          </Text>
          <TouchableOpacity onPress={onExit}>
            <XCircle color={"white"} size={32} />
          </TouchableOpacity>
        </View>
        <ScrollView style={{ flex: 1 }}>
          {questions.map((data, index) => (
            <QuestionCard
              data={data}
              index={index}
              choice={stats.answers[index]}
              key={index}
            />
          ))}
        </ScrollView>
      </View>
    </Animated.View>
  );
};

export default Review;

const QuestionCard = ({ data, index, choice }) => {
  const correctAnswerLetter = data.answer;
  const correctAnswer = data.choices[correctAnswerLetter];
  const userChoice = data.choices[choice]
  const isCorrect = choice === correctAnswerLetter
  return (
    <View
      style={[
        {
          backgroundColor: "#FBF0EE",
          borderColor:(isCorrect ? "green" : 'red'),
          borderWidth:2,
          marginBottom:8,
          padding: 12,
          borderRadius: 12,
          maxWidth: 500,
        },
      ]}
    >
      <Text style={reviewStyle.question}>
        {index + 1}. {data.question}
      </Text>
      <View
        style={{
          backgroundColor: "#2E5A9F",
          padding: 12,
          borderRadius: 12,
        }}
      >
        <Text style={reviewStyle.bold}>
          Your Answer: {choice.toUpperCase()}. {userChoice.text}
        </Text>
        {!isCorrect && (
          <Text style={[reviewStyle.text, { marginBottom: 6 }]}>
            {userChoice.rationale}
          </Text>
        )}
        <Text style={reviewStyle.bold}>
          Answer: {correctAnswerLetter.toUpperCase()}. {correctAnswer.text}
        </Text>
        <Text style={reviewStyle.text}>{correctAnswer.rationale}</Text>
      </View>
    </View>
  );
};

const reviewStyle = StyleSheet.create({
  text:{
    color:'white',
    textAlign:'justify'
  },
  bold:{
    color:'white',
    fontWeight:900,
  },
  question:{
    marginVertical:12,
    color:'black',
    fontSize:16
  }
})