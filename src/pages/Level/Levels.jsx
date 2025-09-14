import { useNavigation } from "@react-navigation/native";
import { ArrowLeftCircle } from "lucide-react-native";
import { useContext, useEffect, useRef, useState } from "react";
import {
  Alert,
  BackHandler,
  Dimensions,
  ImageBackground,
  ScrollView,
  Text,
  Pressable,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AccountContext from "../../contexts/AccountContext";
import styles from "../../styles/styles";
import Leaderboard from "../Game/Leaderboard";
import LevelButton from "./LevelButton";
import locations from "./locations.json";
import ModalContext from "../../contexts/ModalContext";
import axios from "axios";
import { API_URL } from "../../constants";
import LevelStory from "./LevelStory";
import MajorStory from "./MajorStory";

const Levels = (props) => {
  const { categoryIndex, isMastery, selectedMode = "review"  } = props.route.params;
  const { accountData, progressData, setAccountData, setProgressData } = useContext(AccountContext);
  console.log(progressData);
  
  const { setModal } = useContext(ModalContext)
  const categoryProgress =
    progressData["classic"][categoryIndex.id];
  const storyProgress = progressData["story"][categoryIndex.id];
  console.log(progressData["story"][categoryIndex.id]);
  

  const [leaderboardLevel, setLeaderboardLevel] = useState(null);
  const [mode, setMode] = useState(selectedMode);
  const nav = useNavigation()
  const insets = useSafeAreaInsets();
  const notchHeight = insets.top;
  useEffect(() => {
    console.log("is mastery", isMastery);

    openMastery();

    if (!isMastery && mode === "review" && accountData.tutorial.review) {
      setModal({
        mode: "Tutorial-Review",
        secondaryFn: () => {
          removeTutorial("review");
          setModal(null)
        },
        background: "darker",
      });
    }else if(!isMastery && mode === "competition" && accountData.tutorial.competition){
      setModal({
        mode: "Tutorial-Competition",
        secondaryFn: () => {
          removeTutorial("competition");
          setModal(null);
        },
        background: "darker",
      });
    }
  }, [mode]);

  const openMastery = () => {
    if (isMastery && progressData.classic[categoryIndex.id] >= 10) {
      openMasteryModal();
    } else if (isMastery) {
      completeAllLevelsModal();
    }
  }

  const removeTutorial = async (tutorial) => {
    try {
      const { data } = await axios.get(
        API_URL +
          "/removeTutorial?user_id=" +
          accountData._id +
          "&tutorial=" +
          tutorial
      );
      setAccountData(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  const openMasteryModal = () => {
    setModal({
      subtitle: `Mastery`,
      primaryFn: () => {
        nav.replace("Game", {
          categoryIndex,
          mode: "mastery",
          isMastery
        });
        setModal(null);
      },
      secondaryFn: () => {
        nav.goBack();
        setModal(null);
      },
      body: `Answer all 100 questions from this world! Would you like to start mastery?`,
      mode: "LevelSelectMastery",
      onLeaderboard: () => {
        setLeaderboardLevel("none")
        setModal(null);
      },
      colors: {
        primary_color: categoryIndex.primary_color,
        secondary_color: categoryIndex.secondary_color,
      },
    });
  }
  const completeAllLevelsModal = () => {
    setModal({
      subtitle: `Mastery`,
      button: "Continue",
      primaryFn: () => {
        nav.goBack();
        setModal(null);
      },
      secondaryFn: () => {
        nav.goBack();
        setModal(null);
      },
      body: (
        <>
          You have to complete all levels of this category first before you can
          compete in mastery.
        </>
      ),
      mode: "LevelSelectMastery",
      onLeaderboard: () => {
        setLeaderboardLevel("none");
        setModal(null);
      },
      colors: {
        primary_color: categoryIndex.primary_color,
        secondary_color: categoryIndex.secondary_color,
      },
    });
  }

  const scrollViewRef = useRef();
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: false });
  }, [scrollViewRef]);

  useEffect(() => {
    const backAction = () => {
      console.log(leaderboardLevel);

      if (leaderboardLevel) {
        setLeaderboardLevel(null);
      } else {
        nav.goBack();
      }

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [leaderboardLevel]);

  useEffect(() => {
    console.log("PROGRESS", storyProgress);
    if([0, 1, 5, 8].includes(storyProgress)){
      showMajorStory();
    }
  }, [])
  // easy 1-4, average 5-7, difficult 8-10
  const getDifficulty = (level) => {
    return level >= 7 ? "DIFFICULT" : level <= 3 ? "EASY" : "AVERAGE";
  }

  // --------- Story -------------------
  const [isStoryShown, setIsStoryShown] = useState(false)
  const [isMajorStoryShown, setIsMajorStoryShown] = useState(false)
  const [majorStoryData, setMajorStoryData] = useState(null);
  const levelModal = useRef(null);

  const showStory = (modal, index, check = true) => {
    console.log(categoryIndex, index, "isShowing", isStoryShown);
    console.log("show story");
    if(check && storyProgress >= index + 1){
      modal();
      return;
    }
    
    setIsStoryShown(true);
    levelModal.current = {modal, index, check};
  }
  const hideStory = async () => {
    console.log(levelModal.current);
    setIsStoryShown(false);
    if(levelModal.current.check){
      try {
        const { data } = await axios.post(API_URL + "/progressStory", {
          user_id: accountData._id,
          category: categoryIndex.id,
          value: levelModal.current.index + 1,
        });
        console.log(data);
        setProgressData(data);
      } catch (error) {
        console.error(error);
      }
    }
    
    levelModal.current.modal();
    levelModal.current = null;
  }

  const showMajorStory = () => {
    const difficulty = getDifficulty(storyProgress);
    const storyData = {
      category: categoryIndex.id,
      difficulty,
      onClose: () => hideMajorStory()
    }
    setMajorStoryData(storyData)
    setIsMajorStoryShown(true);

  }
  const hideMajorStory = async () => {
    try {
      const { data } = await axios.post(API_URL + "/progressStory", {
        user_id: accountData._id,
        category: categoryIndex.id,
        value: storyProgress + 0.1,
      });
      console.log(data);
      setProgressData(data);
      setIsMajorStoryShown(false);
      setMajorStoryData(null);
    } catch (error) {
      console.error(error);
    }
    
  }
  return (
    <View style={{ backgroundColor: `${categoryIndex.primary_color}` }}>
      {isStoryShown && (
        <LevelStory
          levelSelected={levelModal.current?.index + 1}
          storyProgress={storyProgress}
          category={categoryIndex.id}
          onClose={() => hideStory()}
        />
      )}
      {isMajorStoryShown && (
        <MajorStory data={majorStoryData} />
      )}
      {leaderboardLevel && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 5,
          }}
        >
          <Leaderboard
            onExit={() => {
              setLeaderboardLevel(null);
              openMastery();
            }}
            level={leaderboardLevel}
            categoryIndex={categoryIndex}
            mode={isMastery ? "mastery" : "competition"}
          />
        </View>
      )}
      <CategoryBar categoryIndex={categoryIndex} modeState={[mode, setMode]} />
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{
          paddingTop: notchHeight + 100,
          justifyContent: "center",
          alignItems: "center",
        }}
        style={{
          height: Dimensions.get("screen").height,
          backgroundColor: `${categoryIndex.primary_color}`,
          width: 420,
          marginHorizontal: "auto",
        }}
        overScrollMode="never"
        scrollToOverflowEnabled={false}
        decelerationRate="fast"
      >
        <ImageBackground
          source={categoryIndex.level_background}
          style={[{ height: 1500, width: "100%" }]}
          resizeMode="cover"
          resizeMethod="scale"
        >
          <View style={{ flex: 1 }}>
            {locations
              .find((location) => location.id === categoryIndex.id)
              .locations.map((details, index) => (
                <LevelButton
                  onStory={showStory}
                  setLeaderboardLevel={(level) => setLeaderboardLevel(level)}
                  details={details}
                  key={index}
                  categoryIndex={categoryIndex}
                  index={index}
                  isMastery={isMastery}
                  mode={isMastery ? "mastery" : mode}
                  state={
                    details.level === "?" && categoryProgress === index
                      ? "boss"
                      : categoryProgress > index
                      ? "done"
                      : categoryProgress === index
                      ? "current"
                      : "soon"
                  }
                  stars={
                    progressData?.high_scores[categoryIndex?.id]?.[index]
                      ?.stars || 0
                  }
                />
              ))}
            <View
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
              }}
            ></View>
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
};

export default Levels;

const CategoryBar = ({ categoryIndex, modeState }) => {
  const [mode, setMode] = modeState;
  const nav = useNavigation();
  const insets = useSafeAreaInsets();
  const notchHeight = insets.top;
  return (
    <View style={{backgroundColor: `${categoryIndex.primary_color}DD`, position:'absolute', top:0, zIndex:4}}>
      <View style={{height: notchHeight}}></View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          zIndex: 5,
          flexDirection: "row",
          flex: 0,
        }}
      >
        <View style={{flexDirection: 'row', justifyContent:'space-evenly', alignItems:'center', padding: 14, width:'100%'}}>
          <Pressable
            style={{
              padding: 12,
              position:'absolute',
              left: 0,
              zIndex:10
            }}
            onPress={() => {
              nav.goBack();
            }}
          >
            <ArrowLeftCircle size={32} color={"white"} />
          </Pressable>
          <Text style={[styles.entryTitle, { color: "white", fontSize: 20, alignSelf:'center', width:'90%'}]}>
            {categoryIndex.name.toUpperCase()}
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#F9EBDE",
          borderRadius: 24,
          padding: 6,
          borderWidth: 4,
          marginVertical: 6,
          marginHorizontal: 24,
          borderColor: "#2E5A9F",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Pressable
          style={[tabStyle.tab, mode === "review" ? tabStyle.tabActive : {}]}
          onPress={() => setMode("review")}
        >
          <Text
            style={[
              tabStyle.text,
              mode === "review" ? tabStyle.textActive : tabStyle.textInactive,
            ]}
          >
            REVIEW
          </Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            tabStyle.tab,
            mode === "competition" ? tabStyle.tabActive : {},
            {
              opacity: pressed ? 0.5 : 1, // Change opacity when pressed
            },
          ]}
          onPress={() => setMode("competition")}
        >
          <Text
            style={[
              tabStyle.text,
              mode === "competition"
                ? tabStyle.textActive
                : tabStyle.textInactive,
            ]}
          >
            COMPETITION
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const tabStyle = {
  tab: { flex: 1, borderRadius: 12, padding: 12 },
  tabActive: { backgroundColor: "#2E5A9F" },
  text: { fontWeight: "bold", textAlign: "center", fontSize: 16 },
  textActive: { color: "white" },
  textInactive: { color: "#2E5A9F" },
};
