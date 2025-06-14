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


export default function Start() {
  const { modal, setModal } = useContext(ModalContext);
  function handlesYes() {
    modal.primaryFn();
  }

  function handlesNo() {
    modal.secondaryFn();
  }
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
        style={modalStyles.modalBackground}
        entering={FadeIn}
        exiting={FadeOut}
      >
        <Animated.View
          style={[modalStyles.card, { width: "100%" }]}
          entering={BounceIn.duration(500)}
          exiting={ZoomOut.duration(300)}
        >
          {modal.mode === "LevelSelect" ? (
            <>
              <Title title={"START"} colors={modal.colors} />
              <Body onClose={modal.secondaryFn} colors={modal.colors}>
                <Text style={[modalStyles.subtitle, {color: modal.colors.primary_color}]}>{modal.subtitle}</Text>
                <Text style={[modalStyles.bodyText, modal.colors && {color:'black'}]}>{modal.body}</Text>
                <View
                  style={[modalStyles.btnContainer]}
                >
                  <Button text={"Start"} onPress={modal.primaryFn} style={{width:'50%'}} />
                </View>
              </Body>
              {/* <View style={[style.outer, {marginTop:12}]}>
                <View style={style.inner}> */}
                  <Button
                    text={"View Leaderboard"}
                    onPress={modal.onLeaderboard}
                    style={{ marginVertical: 16 }}
                    textStyle={{fontSize: 18}}
                  />
                {/* </View>
              </View> */}
            </>
          ) : (
            <>
              <Title title={"Select Mode"} />
              <Body onClose={modal.secondaryFn}>
                <Text style={[modalStyles.subtitle]}>
                  {modal.subtitle.toUpperCase()}
                </Text>

                <TouchableOpacity onPress={handlesYes}>
                  <Image source={classic} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => modal.masteryFn()}>
                  <Image source={mastery} />
                </TouchableOpacity>
              </Body>
            </>
          )}
        </Animated.View>
      </Animated.View>
    </>
  );
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
