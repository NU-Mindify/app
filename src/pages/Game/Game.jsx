import { View, Text, ToastAndroid } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AppBackground from "../../components/AppBackground";
import Questions from "./Questions";
import LevelBackground from "../../assets/maps/1.png";
import data from "./data.json";
import RationaleModal from "./RationaleModal";
import Results from "./Results";
import AccountContext from "../../contexts/AccountContext";
import moment from "moment";
import Review from "./Review";
import { categoryLevelBackground } from "../../constants";

const Game = (props) => {
  const { level, levelIndex, categoryIndex} = props.route.params;
  const {accountData, setAccountData} = useContext(AccountContext)

  const [questions, setQuestions] = useState(null);
  const [currentNumber, setCurrentNumber] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [rationaleModal, setRationaleModal] = useState(null);
  const [showReview, setShowReview] = useState(false)
  const [stats, setStats] = useState({
    startTime: moment(),
    correct: 0,
    wrong: 0,
    answers: [],
  });

  const showRationale = (answer) => {
    let newStats = {
      ...stats,
      answers: [...stats.answers, answer],
    };

    if (answer === currentQuestion.answer) {
      newStats.correct = stats.correct + 1;
    } else {
      newStats.wrong = stats.wrong + 1;
    }
    setStats(newStats);
    console.log(newStats);
    setRationaleModal({
      title: `Question ${currentNumber + 1}`,
      subtitle: `${answer.toUpperCase()}. ${
        currentQuestion.choices[answer].text
      }`,
      body: currentQuestion.choices[answer].rationale,
      isCorrect: answer === currentQuestion.answer,
      primaryFn: () => {
        nextQuestion(newStats);
        setRationaleModal(null);
      },
    });
    setCurrentQuestion(null);
  };

  const nextQuestion = (newStats) => {
    if (currentNumber + 1 === questions.length) {
      // if game is done
      const newAccountData = accountData;
      const statsWithEndTime = { ...newStats, endTime: moment() };
      setStats(statsWithEndTime);

      setCurrentNumber((current) => current + 1);

      if (accountData.progress[categoryIndex] === levelIndex && newStats.correct > 1) {
        // if level is not a replay and correct answer is not 0, unlock next level
        newAccountData.progress[categoryIndex] = accountData.progress[categoryIndex] + 1;
        setAccountData(newAccountData);
        console.log("settedAccount", newAccountData);
      }
      return;
    }
    setCurrentNumber((current) => current + 1);
    setCurrentQuestion(questions[currentNumber + 1]);
  };

  useEffect(() => {
    setQuestions(data);
    setCurrentQuestion(data[currentNumber]);
  }, []);

  return (
    <AppBackground
      source={categoryLevelBackground[categoryIndex]}
      viewStyle={{
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.6)",
      }}
    >
      {currentQuestion && (
        <Questions
          level={level}
          data={currentQuestion}
          number={currentNumber}
          onAnswer={showRationale}
        />
      )}
      {rationaleModal && <RationaleModal modal={rationaleModal} />}
      {questions &&
        currentNumber === questions.length &&
        (!showReview ? (
          <Results
            stats={stats}
            categoryIndex={categoryIndex}
            onReview={() => setShowReview(true)}
          />
        ) : (
          <Review
            questions={questions}
            stats={stats}
            onExit={() => setShowReview(false)}
          />
        ))}
    </AppBackground>
  );
};

export default Game;
