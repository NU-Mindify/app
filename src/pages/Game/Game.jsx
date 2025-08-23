import React, { useContext, useEffect, useRef, useState } from "react";
import AppBackground from "../../components/AppBackground";
import Questions from "./Questions";
import questionsData from "./data.json";
import RationaleModal from "./RationaleModal";
import Results from "./Results";
import AccountContext from "../../contexts/AccountContext";
import moment from "moment";
import Review from "./Review";
import Leaderboard from "./Leaderboard";
import GameContext from "../../contexts/GameContext";
import axios from "axios";
// import { Audio } from "expo-av";
import { API_URL, gameColors } from "../../constants";
import { Alert, BackHandler, Text, ToastAndroid } from "react-native";
import ModalContext from "../../contexts/ModalContext";
import Animated from "react-native-reanimated";
import Timer from "./Timer";
import { useNavigation } from "@react-navigation/native";
import { allowScreenCaptureAsync, preventScreenCaptureAsync } from "expo-screen-capture";
import { useAudioPlayer } from "expo-audio";

const Game = (props) => {
  const { level, levelIndex, categoryIndex, isMastery, mode } = props.route.params;
  const { accountData, setAccountData, progressData, setProgressData } = useContext(AccountContext);
  const { setModal } = useContext(ModalContext)
  const categoryProgress = useRef(progressData["classic"][categoryIndex.id])

  const musicPlayer = useAudioPlayer(require("../../audio/guess.mp3"));
  const correctSfxPlayer = useAudioPlayer(require("../../audio/correct.mp3"));
  const wrongSfxPlayer = useAudioPlayer(require("../../audio/wrong.mp3"));

  const [questions, setQuestions] = useState(null);
  const [currentNumber, setCurrentNumber] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [rationaleModal, setRationaleModal] = useState(null);
  const [postGameScreen, setPostGameScreen] = useState("");
  const [currentAttemptID, setCurrentAttemptID] = useState(null)
  const [stats, setStats] = useState({
    startTime: moment(),
    correct: 0,
    wrong: 0,
    streak: 0,
    answers: [],
  });

  const onAnswerSelect = (choice) => {
    let newStats = {
      ...stats,
      answers: [...stats.answers, choice],
      streak: 0,
    };

    if (choice.isCorrect) {
      newStats.correct = stats.correct + 1;
      newStats.streak = stats.streak + 1;
      // PlaySFX(require('../../audio/correct.mp3'))
      correctSfxPlayer.seekTo(0);
      correctSfxPlayer.play();
    } else {
      // PlaySFX(require("../../audio/wrong.mp3"));
      wrongSfxPlayer.seekTo(0);
      wrongSfxPlayer.play();
      newStats.wrong = stats.wrong + 1;
      newStats.streak = 0;
    }
    setStats((prevstats) => ({...prevstats, ...newStats}));
    if (["competition", "mastery"].includes(mode)) {
      setCurrentQuestion(null);
      nextQuestion(newStats);
    } else {
      showRationaleModal(choice, newStats);
      setCurrentQuestion(null);
    }

  };
  // -------------------------------------
  const nextQuestion = async (newStats) => {
    console.log(newStats);
    if (isLevelComplete()) {
      // stopLoopingAudio();
      musicPlayer.pause();
  
      setStats((prevstats) => ({ ...prevstats, endTime: moment() }));
      newStats.endTime = moment()

      addAttemptToServer(newStats)

      setCurrentNumber((current) => current + 1);

      // if (isMovingToNextLevel() && isScorePassed()) {
      //   playSound(require("../../audio/complete.mp3"));
      // } else if (isScorePassed()) {
      //   playSound(require("../../audio/complete.mp3"));
      // } else {
      //   playSound(require("../../audio/lose.mp3"));
      // }
      return;
    }
    setCurrentNumber((current) => current + 1);
    setCurrentQuestion(questions[currentNumber + 1]);
  };

  const addAttemptToServer = async (newStats) => {
    try {
      const highestEarnedStars = progressData.high_scores[categoryIndex.id]?.[levelIndex]?.stars || 0
      const attemptStars = getStarsCount(newStats.correct, questions.length)
      if(highestEarnedStars !== 3 && attemptStars === 3){
        await addBadge(newStats);
      }

      const { data } = await axios.post(API_URL + `/addAttempt`, {
        attempt: {
          user_id: accountData._id,
          level,
          category: categoryIndex.id,
          time_completion: moment
            .duration(newStats.endTime.diff(stats.startTime))
            .asSeconds(),
          correct: newStats.correct,
          wrong: newStats.wrong,
          total_items: questions.length,
          branch: accountData.branch,
          mode,
          stars: attemptStars
        },
        progressUserLevel: isMovingToNextLevel() && isScorePassed() && mode === "competition",
      });
      if (data.hasOwnProperty("progress_data")) { 
        setProgressData(data.progress_data);
      }
      if(data.attempt){
        setCurrentAttemptID(data.attempt._id)
      }

      const { data:newAccount } = await axios.get(API_URL + `/addPoints?user_id=`+accountData._id+"&stars="+attemptStars)
      setAccountData(newAccount)
      setPostGameScreen("Results");
    } catch (error) {
      ToastAndroid.show("Failed to add record: " + error, ToastAndroid.LONG);
      console.error("attempt Error", error.message);
      setRationaleModal({
        type: "Error",
        title: "Server Error",
        subtitle: "Failed to record this attempt.",
        body: "Please Try Again",
        primaryFn: () => {
          setRationaleModal(null);
          addAttemptToServer(newStats);
        },
        colors: {
          primary_color: categoryIndex.primary_color,
          secondary_color: categoryIndex.secondary_color
        }
      });
    }
  };

  const addBadge = async () => {
    try {
      const { data: badge } = await axios.post(API_URL + "/addUserBadge", {
        category: categoryIndex.id,
        level,
        user_id: accountData._id
      })
      console.log("BADGE FILEPATH",badge, badge.badge.filepath);
      
      setRationaleModal({
        type: "Error",
        title: "New Badge",
        subtitle: "You earned a badge!",
        body: "Congratulations on completing the level perfectly with 0 mistakes!",
        "filepath": badge.badge.filepath,
        primaryFn: () => {
          setRationaleModal(null);
        },
        colors: {
          primary_color: categoryIndex.primary_color,
          secondary_color: categoryIndex.secondary_color
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  const showRationaleModal = (choice, newStats) => {
    setRationaleModal({
      title: `Question ${currentNumber + 1}`,
      subtitle: choice.letter
        ? `${choice.letter.toUpperCase()}. ${choice.text}`
        : `Answer:\n ${
            currentQuestion.choices.find((choice) => choice.isCorrect).letter.toUpperCase()
          }. ${
            currentQuestion.choices.find((choice) => choice.isCorrect).text
          }`,
      body: getModalBody(stats.streak, choice),
      isCorrect: choice.isCorrect,
      primaryFn: () => {
        setRationaleModal(null);
        nextQuestion(newStats);
      },
      colors: {
        primary_color: categoryIndex.primary_color,
        secondary_color: categoryIndex.secondary_color,
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
      return (
        choice.rationale ||
        currentQuestion.rationale ||
        currentQuestion.choices.find((choice) => choice.isCorrect).rationale
      );
    }

    return streakCount > 1
      ? `${streakCount} corrects in a row! Keep it up!`
      : streakCount === 1
      ? "Nice one! Let's go for a streak!"
      : "Let's try the next one.";
  }

  const getStarsCount = (correct, totalQuestions) => {
    return correct >= Math.floor(totalQuestions * 1) ? 3 : 
    correct >= Math.floor(totalQuestions * 0.9) ? 2 :
    correct >= Math.floor(totalQuestions * 0.8) ? 1 : 0
  }
  // -----------------------------------------

  const getQuestions = async () => {
    try {
      let URL = `${process.env.EXPO_PUBLIC_URL}/getQuestions?category=${categoryIndex.id}&level=${level}`;
      if(categoryIndex.id === "abnormal" && mode !== 'mastery'){
        URL = `${process.env.EXPO_PUBLIC_URL}/getQuestions?category=${categoryIndex.id}&start=${items[level].start}&end=${items[level].end}`;
      }
      if(mode === "mastery"){
        URL = API_URL + "/getQuestions?category=" + categoryIndex.id
      }
      // const { data } = await axios.get(`${process.env.EXPO_PUBLIC_URL}/getQuestions?category=${'developmental'}&level=${1}`)
      console.log(accountData.token)
      const { data } = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${accountData.token}`,
        },
      });
      const questions = data.length !== 0 ? data : questionsData

      if(["competition", "mastery"].includes(mode)){
        let shuffledQuestions = questions
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value);
        setQuestions(shuffledQuestions)
        setCurrentQuestion(shuffledQuestions[currentNumber]);
      }else{
        setQuestions(questions);
        setCurrentQuestion(questions[currentNumber]);
      }

    } catch (error) {
      console.error("getting questions", error.message);
    }
  }

  const nav = useNavigation()
  // Confirm back while in-game
  useEffect(() => {
    const unsubscribe = nav.addListener("beforeRemove", (e) => {
      e.preventDefault();
      const isGoBackAction =
        e.data.action.type === "GO_BACK" || e.data.action.type === "POP";
      
      if(postGameScreen !== "") {
        nav.dispatch(e.data.action);
        return;
      }
      if (!isGoBackAction && postGameScreen === "") return;

      Alert.alert(
        "Cancel?",
        "Are you sure you want to return to home screen? All progress will be lost.",
        [
          { text: "Cancel", style: "cancel", onPress: () => {} },
          {
            text: "Yes",
            style: "destructive",
            onPress: () => nav.dispatch(e.data.action),
          },
        ]
      );
    });

    return unsubscribe; 
  }, [nav, postGameScreen]);
  // Prevents Screenshot
  useEffect(() => {
    console.log(postGameScreen);
    const toggleScreenCapture = async () => {
      if (postGameScreen === "" || postGameScreen === "Review") {
        await preventScreenCaptureAsync();
      } else {
        await allowScreenCaptureAsync();
      }
    };

    toggleScreenCapture();

    return () => {
      allowScreenCaptureAsync();
    };
  }, [postGameScreen]);
  
  useEffect(() => {
    getQuestions();
    musicPlayer.loop = true
    musicPlayer.play()
  }, []);

  
  return (
    <GameContext.Provider
      value={{ level, levelIndex, categoryIndex, isMastery, mode, gameColor: gameColors[categoryIndex.id] }}
    >
      <AppBackground
        viewStyle={{
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.6)",
        }}
        gradientColors={gameColors[categoryIndex.id].background}
      >
        {currentQuestion && (
          <>
            <Animated.View
              style={{
                width: "85%",
                margin: "auto",
                borderRadius: 24,
                backgroundColor: "white",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "LilitaOne-Regular",
                  textAlign: "center",
                  padding: 12,
                  color: categoryIndex.primary_color,
                }}
              >
                {categoryIndex.name.toUpperCase()}
              </Text>
            </Animated.View>
            <Text style={{ color: "#8CFFC2", fontSize:32, textAlign:'center', marginVertical:24, fontFamily:'LilitaOne-Regular'}}>{mode === "mastery" ? "MASTERY" : "LEVEL: EASY"}</Text>
            {mode !== "review" &&
            <Timer onZero={() => onAnswerSelect({isCorrect: false})} duration={mode !== "mastery" ? 30 : currentQuestion.difficulty === "E" ? 20 : currentQuestion.difficulty === "A" ? 40 : currentQuestion.difficulty === "D" ? 60 : 30 } currentNumber={currentNumber} />
            }
            <Questions
              level={level}
              data={currentQuestion}
              number={currentNumber}
              onAnswer={onAnswerSelect}
              length={questions.length}
            />
          </>
        )}
        {rationaleModal && <RationaleModal modal={rationaleModal} />}
        {questions &&
          currentNumber === questions.length &&
          (postGameScreen === "Results" ? (
            <Results
              stats={stats}
              onReview={() => setPostGameScreen("Review")}
              onLeaderboard={() => setPostGameScreen("Leaderboard")}
            />
          ) : postGameScreen === "Review" ? (
            <Review
              questions={questions}
              stats={stats}
              onExit={() => setPostGameScreen("Results")}
            />
          ) : (
            postGameScreen === "Leaderboard" && (
              <Leaderboard
                onExit={() => setPostGameScreen("Results")}
                level={level}
                categoryIndex={categoryIndex}
                isMastery={isMastery}
                current={currentAttemptID}
                mode={mode}
              />
            )
          ))}
      </AppBackground>
    </GameContext.Provider>
  );
};

export default Game;

const items = {
  1: {
    start: 1,
    end: 8
  },
  2: {
    start: 9,
    end: 15
  },
  3:{
    start: 16,
    end: 23,
  },
  4:{
    start: 24,
    end: 30,
  },
  5:{
    start: 31,
    end: 50,
  },
  6:{
    start: 51,
    end: 70
  },
  7:{
    start: 71,
    end: 78
  },
  8:{
    start: 79,
    end: 85
  },
  9:{
    start: 86,
    end: 93,
  },
  10:{
    start: 94,
    end:100
  }
}