import React, { useContext, useEffect, useRef, useState } from "react";
import AppBackground from "../../components/AppBackground";
import Questions from "./Questions";
import data from "./data.json";
import RationaleModal from "./RationaleModal";
import Results from "./Results";
import AccountContext from "../../contexts/AccountContext";
import moment from "moment";
import Review from "./Review";
import GameContext from "../../contexts/GameContext";
import axios from "axios";
import { Audio } from "expo-av";

const Game = (props) => {
  const { level, levelIndex, categoryIndex, isMastery } = props.route.params;
  const { accountData, progressData, setProgressData } = useContext(AccountContext);
  const categoryProgress = useRef(progressData[isMastery ? "mastery" : "classic"][categoryIndex.id])

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

  const onAnswerSelect = (choice) => {
    let newStats = {
      answers: [...stats.answers, choice],
      streak: 0,
    };

    if (choice.isCorrect) {
      newStats.correct = stats.correct + 1;
      newStats.streak = stats.streak + 1;
    } else {
      newStats.wrong = stats.wrong + 1;
      newStats.streak = 0;
    }
    setStats((prevstats) => ({...prevstats, ...newStats}));

    showRationaleModal(choice);
    setCurrentQuestion(null);

  };
  // -------------------------------------
  const nextQuestion = async () => {
    if (isLevelComplete()) {
      stopLoopingAudio();
      setStats(prevstats => ({...prevstats, endTime: moment()}));
      setCurrentNumber((current) => current + 1);

      if (isMovingToNextLevel() && isScorePassed()) {
        playSound(require("../../audio/complete.mp3"));
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
      } else if(isScorePassed()) {
        playSound(require("../../audio/complete.mp3"));
      } else{
        playSound(require("../../audio/lose.mp3"));
      }
      return;
    }
    setCurrentNumber((current) => current + 1);
    setCurrentQuestion(questions[currentNumber + 1]);
  };

  const showRationaleModal = (choice) => {
    setRationaleModal({
      title: `Question ${currentNumber + 1}`,
      subtitle: `${choice.letter.toUpperCase()}. ${
        choice.text
      }`,
      body: getModalBody(stats.streak, choice),
      isCorrect: choice.isCorrect,
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
    return categoryProgress.current === levelIndex
  }
  const isScorePassed = () => {
    return stats.correct >= Math.floor((stats.correct + stats.wrong) * 0.8);
  }
  const getModalBody = (streakCount, choice) => {
    if (!isMastery) {
      return choice.rationale || `${currentQuestion.choices.find(choice => choice.isCorrect).letter}. ${currentQuestion.rationale}`;
    }

    return streakCount > 1
      ? `${streakCount} corrects in a row! Keep it up!`
      : streakCount === 1
      ? "Nice one! Let's go for a streak!"
      : "Let's try the next one.";
  }
  // -----------------------------------------

  const getQuestions = async () => {
    try {
      const { data } = await axios.get(`${process.env.EXPO_PUBLIC_URL}/getQuestions?category=${'developmental'}&level=${1}`)
      // const { data } = await axios.get(`${process.env.EXPO_PUBLIC_URL}/getQuestions?category=${categoryIndex.id}&level=${level}`)
      setQuestions(data);
      setCurrentQuestion(data[currentNumber]);
    } catch (error) {
      console.error("getting questions", error.message);
    }
  }

  const { playSound, stopLoopingAudio } = Sound();
  useEffect(() => {
    getQuestions();
    playSound();

    return () => {
      stopLoopingAudio(); // Stop and unload on unmount
    };
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


const Sound = () => {
  const [sound, setSound] = useState(null); // Keep the sound object in a module scope
  
  const playSound = async (source) => {
    if(sound){
      await sound.unloadAsync();
      setSound(null)
    }
    const { sound } = await Audio.Sound.createAsync(
      source || require("../../audio/guess.mp3"),
      {
        isLooping: source ? false : true,
        shouldPlay: true,
      }
    );
    setSound(sound);
  };
  
  const stopLoopingAudio = async () => {
    try {
      if (sound) {
      await sound.unloadAsync();
        setSound(null);
      }
    } catch (error) {
      console.error("Error playing looping audio:", error);
    }
    };

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return { playSound, stopLoopingAudio };
}
