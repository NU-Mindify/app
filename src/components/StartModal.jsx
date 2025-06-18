import { useContext, useEffect } from "react";
import { BackHandler, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  BounceIn,
  FadeIn,
  FadeOut,
  FlipInXDown,
  ZoomOut
} from "react-native-reanimated";
import X from "../assets/generic/x.svg";
import classic from "../assets/modal/classic.png";
import mastery from "../assets/modal/mastery.png";
import ModalContext from "../contexts/ModalContext";
import { modalStyles } from "../styles/modalStyles";
import Button from "./Button";
import AccountContext from "../contexts/AccountContext";
import { SignOut } from "../hooks/useFirebase";
import { OctagonAlert } from "lucide-react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import SearchStudent from "./modal/SearchStudent";


export default function Start() {
  const { modal, setModal } = useContext(ModalContext);
  
  useEffect(()=>{
    const backAction = () => {
      modal.secondaryFn();
      return true;
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)
    return () => backHandler.remove();
  },[])
  return (
    <>
      <Animated.View
        style={[
          modalStyles.modalBackground,
          modal.background === "darker" && {
            backgroundColor: "rgba(0,0,0,0.7)",
          },
        ]}
        entering={FadeIn}
        exiting={FadeOut}
      >
        <Animated.View
          style={[modalStyles.card, { width: "100%" }]}
          entering={BounceIn.duration(500)}
          exiting={ZoomOut.duration(300)}
        >
          {!modal.mode && <Default modal={modal} />}
          {modal.mode === "LevelSelect" && <LevelSelect modal={modal} />}
          {modal.mode === "LevelSelectMastery" && (
            <LevelSelectMastery modal={modal} />
          )}
          {modal.mode === "ModeSelect" && <SelectMode modal={modal} />}
          {modal.mode === "Settings" && <Settings modal={modal} />}
          {modal.mode === "Tutorial-Worlds" && (
            <HowToPlayWorlds modal={modal} />
          )}
          {modal.mode === "Tutorial-Review" && (
            <HowToPlayReview modal={modal} />
          )}
          {modal.mode === "Tutorial-Competition" && (
            <HowToPlayCompetition modal={modal} />
          )}
          {modal.mode === "Tutorial-Mastery" && (
            <HowToPlayReview modal={modal} />
          )}
          {modal.mode === "Search" && (
            <SearchStudent  />
          )}
        </Animated.View>
      </Animated.View>
    </>
  );
}
const Settings = ({modal}) => {
  const {setAccountData} = useContext(AccountContext);
  const {setModal} = useContext(ModalContext)
  const nav = useNavigation();
  return (
    <>
      <Title title={"Settings"} />
      <Body onClose={modal.secondaryFn} contentStyle={{padding:24, width:300, gap:12}}>
        <Button text={"Replay Story"} 
        style={{width:'80%', marginTop:18}}
        onPress={async () => {
          nav.navigate("Story")
          setModal(null)
        }}/>
        <Button text={"How to play"} 
        style={{width:'80%'}}
        onPress={async () => {
          setModal(null)
          setModal({
            mode:"Tutorial-Worlds",
            secondaryFn: () => {
              setModal({
                mode: "Tutorial-Review",
                secondaryFn: () =>
                  setModal({
                    mode: "Tutorial-Competition",
                    secondaryFn: () =>
                      setModal({
                        mode: "Settings",
                        secondaryFn: () => setModal(null),
                      }),
                    background: "darker",
                  }),
                background: "darker",
              });
            },
            background:'darker'
          })
        }}/>
        <Button text={"Sign Out"} 
        style={{width:'80%'}}
        onPress={async () => {
          // nav.replace("Get Started");
          await SignOut();
          setAccountData(null);
          setModal(null)
        }}/>
      </Body>
    </>
  )
}
const HowToPlayWorlds = ({modal}) => {
  return(
    <>
    <Title title={"Tutorial"} />
    <Body onClose={modal.secondaryFn} closeButton={false} contentStyle={{
      width:"90%", paddingTop:24, gap:12
      }}>
      <Text style={{fontFamily:'LilitaOne-Regular', fontSize:24, color:'white'}}>CHOOSE A WORLD</Text>
      <Text style={{color:'white', fontSize:16, textAlign:'center', paddingHorizontal:24}}>Start by selecting one of five psychology worlds to explore. Each world is themed around a different field of psychology—pick the one that sparks your curiosity!</Text>
      <Image source={require("../assets/tutorial/worlds.png")} style={{}} />
      <Button 
        text={"Continue"}
        onPress={modal.secondaryFn} 
      />
    </Body>
    </>
  )
}
const HowToPlayReview = ({modal}) => {
  return(
    <>
    <Title title={"Tutorial"} />
    <Body onClose={modal.secondaryFn} closeButton={false} contentStyle={{
      width:"90%", paddingTop:24, gap:12, maxHeight:600
    }}>
        <ScrollView contentContainerStyle={{alignItems:'center', gap:8}} persistentScrollbar={true}>

      <Text style={{fontFamily:'LilitaOne-Regular', fontSize:24, color:'white'}}>CLASSIC MODE</Text>
      <Text style={{fontFamily:'LilitaOne-Regular', fontSize:18, color:'white'}}>-- Review --</Text>


      <Text style={tutorialStyle.text}><OctagonAlert color={"white"} size={16} /> NOTE : You must complete and pass the current level in competition mode to unlock the next one—no shortcuts!
      <Text style={{fontWeight:900}}> To pass, you need to earn at least one star or score 80% of the total items.</Text></Text>

      <Image source={require("../assets/tutorial/reviewTutorial.png")} style={{}} />
      <Image source={require("../assets/tutorial/selectLevel.png")} style={{}} />
      <Text style={tutorialStyle.text}>Select a level, hit the Start button, and begin your learning journey.</Text>
      <Image source={require("../assets/tutorial/questionnaire.png")} style={{}} />
      <Text style={tutorialStyle.text}>Read each question carefully and choose the correct answer.
      Be mindful of the time—every second counts!</Text>
      <Image source={require("../assets/tutorial/rationale.png")} style={{}} />
      <Text style={tutorialStyle.text}>After answering, you'll receive a feedback.
      Take a moment to understand the explanation—it's your key to leveling up!</Text>

      <Image source={require("../assets/tutorial/reviewResults.png")} style={{}} />
      <Text style={tutorialStyle.text}>Answer all the questions and—tadah!—you're done!
      Good luck on your learning journey!</Text>
        </ScrollView>
      <Button 
        text={"Continue"}
        onPress={modal.secondaryFn} 
        />
    </Body>
    </>
  )
}
const HowToPlayCompetition = ({modal}) => {
  return(
    <>
    <Title title={"Tutorial"} />
    <Body onClose={modal.secondaryFn} closeButton={false} contentStyle={{
      width:"90%", paddingTop:24, gap:12, maxHeight:600
      }}>
        <ScrollView contentContainerStyle={{alignItems:'center', gap:8}} persistentScrollbar={true}>
      <Text style={{fontFamily:'LilitaOne-Regular', fontSize:24, color:'white'}}>CLASSIC MODE</Text>
      <Text style={{fontFamily:'LilitaOne-Regular', fontSize:18, color:'white'}}>-- Competition --</Text>
      <Text style={tutorialStyle.text}><OctagonAlert color={"white"} size={16} /> NOTE : You must complete and pass the current level to unlock the next one—no shortcuts!
      <Text style={{fontWeight:900}}> To pass, you need to earn at least one star or score 80% of the total items.</Text></Text>
      <Image source={require("../assets/tutorial/competitionTutorial.png")} style={{}} />
      <Text style={tutorialStyle.text}> There's no feedback here—just pure skill and focus.
      Give it your best shot and aim for a perfect score!</Text>
      <Image source={require("../assets/tutorial/answer.png")} style={{}} />

      <Text style={tutorialStyle.text}> Answer all the questions and—tadah!—you're done!
      Earn stars and climb the leaderboard.</Text>

      <Image source={require("../assets/tutorial/competitionResults.png")} style={{}} />

      </ScrollView>
      <Button 
        text={"Continue"}
        onPress={modal.secondaryFn} 
      />
    </Body>
    </>
  )
}

const tutorialStyle = StyleSheet.create({
  text:{color:'white', fontSize:16, textAlign:'center', paddingHorizontal:24}
})
const SettingsContainer = () => {
  return (
    <> 
      <View>

      </View>
    </>
  )
}
const LevelSelect = ({ modal }) => {
  const levelStyle = StyleSheet.create({
    labelContainer:{
      width:'80%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    label:{
      fontFamily:'LilitaOne-Regular',
      fontSize:24,
      color: modal.colors.primary_color
    }
  })
  return (
  <>
    <Title title={"START"} colors={modal.colors} />
    <Body onClose={modal.secondaryFn} colors={modal.colors} contentStyle={{paddingHorizontal:0, gap:4}}>
      <Text style={[modalStyles.subtitle, {color: modal.colors.primary_color}]}>{modal.subtitle}</Text>
      <View style={[levelStyle.labelContainer]}>
        <Text style={[levelStyle.label]}>Difficulty:</Text>
        <Text>{modal.difficulty}</Text>
      </View>
      <View style={[levelStyle.labelContainer]}>
        <Text style={[levelStyle.label]}>Questions:</Text>
        <Text>{modal.items} items</Text>
      </View>
      <View style={[levelStyle.labelContainer]}>
        <Text style={[levelStyle.label]}>Timer:</Text>
        <Text>{modal.timer} seconds</Text>
      </View>
      {/* <Text style={[modalStyles.bodyText, modal.colors && {color:'black'}]}>{modal.body}</Text> */}
      <View
        style={[modalStyles.btnContainer]}
      >
        <Button text={"Start"} onPress={modal.primaryFn} style={{width:'50%'}} />
      </View>
    </Body>
    <Button
      text={"View Leaderboard"}
      onPress={modal.onLeaderboard}
      style={{ marginVertical: 16 }}
      textStyle={{fontSize: 18}}
    />
  </>
  )
}
const Default = ({ modal }) => {
  return (
    <>
      <Title title={modal.title} onClose={modal.primaryFn} />
      <Body
        onClose={modal.secondaryFn}
        contentStyle={{ paddingHorizontal: 0, gap: 4 }}
      >
        <Text
          style={[modalStyles.subtitle]}
        >
          {modal.subtitle}
        </Text>
        <Text
          style={[modalStyles.bodyText]}
        >
          {modal.body}
        </Text>
        <View style={[modalStyles.btnContainer]}>
          <Button
            text={"Ok"}
            onPress={modal.primaryFn}
            style={{ width: "50%" }}
          />
        </View>
      </Body>
    </>
  );
};
const LevelSelectMastery = ({ modal }) => {
  const levelStyle = StyleSheet.create({
    labelContainer:{
      width:'80%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    label:{
      fontFamily:'LilitaOne-Regular',
      fontSize:24,
      color: modal.colors.primary_color
    }
  })
  return (
  <>
    <Title title={"START"} colors={modal.colors} />
    <Body onClose={modal.secondaryFn} colors={modal.colors} contentStyle={{paddingHorizontal:0, gap:4}}>
      <Text style={[modalStyles.subtitle, {color: modal.colors.primary_color}]}>{modal.subtitle}</Text>
      <Text style={[modalStyles.bodyText, modal.colors && {color:'black'}]}>{modal.body}</Text>
      <View
        style={[modalStyles.btnContainer]}
      >
        <Button text={modal.button || "Start"} onPress={modal.primaryFn} style={{width:'60%'}} />
      </View>
    </Body>
    <Button
      text={"View Leaderboard"}
      onPress={modal.onLeaderboard}
      style={{ marginVertical: 16 }}
      textStyle={{fontSize: 18}}
    />
  </>
  )
}

const SelectMode = ({ modal }) => {
 return(
  <>
    <Title title={"Select Mode"} />
    <Body onClose={modal.secondaryFn}>
      <Text style={[modalStyles.subtitle, {fontSize:26}]} allowFontScaling={false}>
        {modal.subtitle.toUpperCase()}
      </Text>

      <TouchableOpacity onPress={() => modal.primaryFn()}>
        <Image source={classic} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => modal.masteryFn()}>
        <Image source={mastery} />
      </TouchableOpacity>
    </Body>
  </>
 )
}

export const Title = ({ title, colors }) => {
  return (
    <Animated.View
      entering={FlipInXDown.delay(200)}
      style={[
        style.outer,
        style.title,
        colors && {
          borderColor: colors.secondary_color,
          backgroundColor: 'white',
        },
      ]}
    >
      <Text
        style={[
          {
            fontFamily: "LilitaOne-Regular",
            color: "white",
            fontSize: 32,
            textAlign: "center",
          },
          colors && {
            color: colors.primary_color
          }
        ]}
      >
        {title}
      </Text>
    </Animated.View>
  );
}
export const Body = ({ children, closeButton=true, onClose, colors, contentStyle }) => {
  console.log(colors);
  
  return (
    <View
      style={[
        style.outer,
        colors && {
          borderColor: colors.secondary_color,
          backgroundColor: colors.secondary_color,
        },
      ]}
    >
      <View
        style={[
          style.inner,
          contentStyle,
          colors && {
            borderColor: colors.primary_color,
            backgroundColor: "white",
          },
        ]}
      >
        {/* X Button */}
        {closeButton && (
          <View
            style={[
              {
                zIndex: 4,
                position: "absolute",
                top: -26,
                right: -26,
              },
            ]}
          >
            <TouchableOpacity activeOpacity={0.7} onPress={onClose}>
              <X width={42} height={42} />
            </TouchableOpacity>
          </View>
        )}
        {children}
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  outer: {
    borderRadius: 24,
    borderColor: "#FDD116",
    borderWidth: 8,
    backgroundColor: "#FDD116",
  },
  inner: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#35408E",
    padding: 10,
    paddingTop: 0,
    borderRadius: 24,
    borderColor: "#2D3A72",
    borderWidth: 8,
  },
  title: {
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
    padding: 8,
    paddingHorizontal: 32,
    backgroundColor: "#35408E",
    borderBottomWidth: 0,
  },
});
