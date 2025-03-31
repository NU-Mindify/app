import React, { useContext, useEffect, useRef, useState } from "react";
import AppBackground from "../../components/AppBackground";
import Questions from "./Questions";
import data from "./data.json";
import RationaleModal from "./RationaleModal";
import Results from "./Results";
import AccountContext from "../../contexts/AccountContext";
import moment from "moment";
import Review from "./Review";
import { categoryLevelBackground } from "../../constants";
import GameContext from "../../contexts/GameContext";
import axios from "axios";

const Game = (props) => {
  const { level, levelIndex, categoryIndex, isMastery } = props.route.params;
  const { accountData, progressData, setProgressData } = useContext(AccountContext);
  const categoryProgress = useRef(progressData[isMastery ? "mastery" : "classic"].find(
    (prog) => prog.category === categoryIndex.id
  ).level)
  

  const [questions, setQuestions] = useState(null);
  const [currentNumber, setCurrentNumber] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [rationaleModal, setRationaleModal] = useState(null);
  const [showReview, setShowReview] = useState(false);
  const [stats, setStats] = useState({
    startTime: moment(),
    correct: 0,
    wrong: 0,
    streak: 0,
    answers: [],
  });

  const onAnswerSelect = (answer) => {
    let newStats = {
      answers: [...stats.answers, answer],
      streak: 0,
    };

    if (answer === currentQuestion.answer) {
      newStats.correct = stats.correct + 1;
      newStats.streak = stats.streak + 1;
    } else {
      newStats.wrong = stats.wrong + 1;
      newStats.streak = 0;
    }
    setStats((prevstats) => ({...prevstats, ...newStats}));

    showRationaleModal(answer);
    setCurrentQuestion(null);

  };
  // -------------------------------------
  const nextQuestion = async () => {
    if (isLevelComplete()) {
      setStats(prevstats => ({...prevstats, endTime: moment()}));
      setCurrentNumber((current) => current + 1);
      if (isMovingToNextLevel()) {
        try {
          const json = await axios.post(
            process.env.EXPO_PUBLIC_URL + "/progressCategory",
            {
              category: categoryIndex.id,
              mode: isMastery ? "mastery" : "classic",
              user_id: accountData._id,
            }
          );
          setProgressData(json.data);
          console.log(json.data); 
        } catch (error) {
          console.error(error.message);
          console.error(error.response.data);
        }
      }
      return;
    }
    setCurrentNumber((current) => current + 1);
    setCurrentQuestion(questions[currentNumber + 1]);
  };

  const showRationaleModal = (answer) => {
    setRationaleModal({
      title: `Question ${currentNumber + 1}`,
      subtitle: `${answer.toUpperCase()}. ${
        currentQuestion.choices[answer].text
      }`,
      body: getModalBody(stats.streak, answer),
      isCorrect: answer === currentQuestion.answer,
      primaryFn: () => {
        setRationaleModal(null);
        nextQuestion();
      },
    });
  };
  
  // ------------------------

  const isLevelComplete = () => {
    return currentNumber + 1 === questions.length;
  }
  const isMovingToNextLevel = () => {
    console.log(categoryProgress, levelIndex);
    return (
      categoryProgress.current === levelIndex &&
      stats.correct >= Math.floor((stats.correct + stats.wrong) * 0.8)
    );
  }
  const getModalBody = (streakCount, answer) => {
    if (!isMastery) {
      return currentQuestion.choices[answer].rationale;
    }

    return streakCount > 1
      ? `${streakCount} corrects in a row! Keep it up!`
      : streakCount === 1
      ? "Nice one! Let's go for a streak!"
      : "Let's try the next one.";
  }
  //

  useEffect(() => {
    setQuestions(data);
    setCurrentQuestion(data[currentNumber]);
  }, []);

  return (
    <GameContext.Provider
      value={{ level, levelIndex, categoryIndex, isMastery }}
    >
      <AppBackground
        source={categoryIndex.level_background}
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
            onAnswer={onAnswerSelect}
          />
        )}
        {rationaleModal && <RationaleModal modal={rationaleModal} />}
        {questions &&
          currentNumber === questions.length &&
          (!showReview ? (
            <Results
              stats={stats}
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
    </GameContext.Provider>
  );
};

export default Game;
