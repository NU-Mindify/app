import { useNavigation } from "@react-navigation/native";
import { ArrowLeftCircle } from "lucide-react-native";
import { useContext, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AccountContext from "../../contexts/AccountContext";
import styles from "../../styles/styles";
import Leaderboard from "../Game/Leaderboard";
import LevelButton from "./LevelButton";
import locations from "./locations.json";

const Levels = (props) => {
  const { categoryIndex, isMastery } = props.route.params;
  const { accountData, progressData } = useContext(AccountContext);
  const categoryProgress =
    progressData[isMastery ? "mastery" : "classic"][categoryIndex.id];

  const [mode, setMode] = useState("competition");

  const scrollViewRef = useRef();
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: false });
  }, [scrollViewRef]);

  const [leaderboardLevel, setLeaderboardLevel] = useState(null);

  return (
    <>
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
            }}
            level={leaderboardLevel}
            categoryIndex={categoryIndex}
            isMastery={isMastery}
          />
        </View>
      )}
      <ScrollView
        stickyHeaderIndices={[0]}
        ref={scrollViewRef}
        style={{
          height: Dimensions.get("screen").height,
          backgroundColor: `${categoryIndex.primary_color}`,
        }}
        overScrollMode="never"
        scrollToOverflowEnabled={false}
        decelerationRate="fast"
      >
        <CategoryBar
          categoryIndex={categoryIndex}
          isMastery={isMastery}
          modeState={[mode, setMode]}
        />
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
                  setLeaderboardLevel={(level) => setLeaderboardLevel(level)}
                  details={details}
                  key={index}
                  categoryIndex={categoryIndex}
                  index={index}
                  isMastery={mode === "competition"}
                  state={
                    details.level === "?" && categoryProgress === index
                      ? "boss"
                      : categoryProgress > index
                      ? "done"
                      : categoryProgress === index
                      ? "current"
                      : "soon"
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
    </>
  );
};

export default Levels;

const CategoryBar = ({ categoryIndex, modeState }) => {
  const [mode, setMode] = modeState;
  const nav = useNavigation();
  const insets = useSafeAreaInsets();
  const notchHeight = insets.top;
  return (
    <>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          zIndex: 5,
          paddingTop: notchHeight + 14,
          backgroundColor: `${categoryIndex.primary_color}CC`,
          paddingHorizontal: 24,
          paddingVertical: 12,
          flexDirection: "row",
          flex: 0,
        }}
      >
        <TouchableOpacity
          style={{
            position: "absolute",
            left: 16,
            top: notchHeight + 6,
          }}
          onPress={() => {
            nav.goBack();
          }}
        >
          <ArrowLeftCircle size={32} color={"white"} />
        </TouchableOpacity>
        <Text style={[styles.entryTitle, { color: "white", fontSize: 24 }]}>
          {categoryIndex.name.toUpperCase()}
        </Text>
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
        <TouchableOpacity
          style={[
            tabStyle.tab,
            mode === "competition" ? tabStyle.tabActive : {},
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
        </TouchableOpacity>
        <TouchableOpacity
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
        </TouchableOpacity>
      </View>
    </>
  );
};

const tabStyle = {
  tab: { flex: 1, borderRadius: 12, padding: 12 },
  tabActive: { backgroundColor: "#2E5A9F" },
  text: { fontWeight: "bold", textAlign: "center", fontSize: 16 },
  textActive: { color: "white" },
  textInactive: { color: "#2E5A9F" },
};
