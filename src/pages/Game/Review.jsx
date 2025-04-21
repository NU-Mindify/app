import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Pressable, ScrollView } from "react-native-gesture-handler";
import { XCircle } from "lucide-react-native";
import AppBackground from "../../components/AppBackground";
import styles from "../../styles/styles";
import { useNavigation } from "@react-navigation/native";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";
import X from "../../assets/generic/X-White.svg";
import moment from "moment";

const Review = ({ questions, stats, onExit }) => {
  const nav = useNavigation();
  return (
    <Animated.View
      entering={ZoomIn}
      exiting={ZoomOut}
      style={{ flex: 1, padding: 28 }}
    >
      <View
        style={[
          styles.entryBackground,
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: 6,
            paddingVertical: 12,
          },
        ]}
      >
        <Text style={[styles.entryBody, { fontSize: 24, fontWeight: "bold" }]}>
          Review
        </Text>
        <TouchableOpacity onPress={onExit}>
          <X width={32} height={32} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: "#F9EBDE",
          borderRadius: 24,
          padding: 6,
          borderWidth: 4,
          marginVertical: 6,
          borderColor: "#2E5A9F",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Text>
          Score: {stats.correct}/{stats.correct + stats.wrong}
        </Text>
        <Text>
          Time: {Math.floor(moment.duration(stats.endTime.diff(stats.startTime)).asSeconds())}s
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "#F9EBDE",
          flex: 1,
          borderRadius: 24,
          padding: 6,
          borderWidth: 8,
          borderColor: "#2E5A9F",
        }}
      >
        <ScrollView contentContainerStyle={{ padding: 12 }} style={{ flex: 1 }}>
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
  const correctAnswer = data.choices.find(choice => choice.isCorrect);
  const isCorrect = choice.isCorrect
  return (
    <View
      style={[
        {
          backgroundColor: "#FBF0EE",
          borderColor: isCorrect ? "green" : "red",
          boxShadow: `0px 2px 6px ${isCorrect ? "green" : "red"}`,
          borderWidth: 2,
          marginBottom: 8,
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
        {!isCorrect && (
          <>
            <Text style={reviewStyle.bold}>
              Your Answer: {"\n"}
              {choice.letter.toUpperCase()}. {choice.text}
              {"\n"}
            </Text>
            {/* <Text style={[reviewStyle.text, { marginBottom: 6 }]}>
              {data.rationale}
            </Text> */}
          </>
        )}
        <Text style={reviewStyle.bold}>
          Answer: {"\n"}
          {correctAnswer.letter.toUpperCase()}. {correctAnswer.text}
        </Text>
        <Text style={reviewStyle.text}>{data.rationale}</Text>
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