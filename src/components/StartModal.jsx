import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  BounceIn,
  BounceOut,
  FadeIn,
  FadeOut,
  FlipInXDown,
  SlideInDown,
  SlideInUp,
  SlideOutDown,
  ZoomIn,
  ZoomInEasyDown,
  ZoomOut,
} from "react-native-reanimated";
import ModalBg from "../assets/modal/startCard.png";
import YesButton from "../assets/modal/yesBtn.png";
import NoButton from "../assets/modal/noBtn.png";
import classic from "../assets/modal/classic.png";
import mastery from "../assets/modal/mastery.png";
import { useContext } from "react";
import ModalContext from "../contexts/ModalContext";
import { modalStyles } from "../styles/modalStyles";
import React from "react";
import X from "../assets/generic/x.svg";
import Button from "./Button";

export default function Start() {
  const { modal, setModal } = useContext(ModalContext);
  function handlesYes() {
    modal.primaryFn();
  }

  function handlesNo() {
    modal.secondaryFn();
  }

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
              <Image source={ModalBg} style={modalStyles.imageStyle} />
              <Text style={modalStyles.subtitle}>{modal.subtitle}</Text>
              <Text style={modalStyles.bodyText}>{modal.body}</Text>
              <Animated.View
                style={[modalStyles.btnContainer, { marginTop: 4 }]}
                entering={BounceIn}
                exiting={BounceOut}
              >
                <TouchableOpacity onPress={handlesYes}>
                  <Animated.Image source={YesButton} />
                </TouchableOpacity>

                <TouchableOpacity onPress={handlesNo}>
                  <Animated.Image source={NoButton} />
                </TouchableOpacity>
              </Animated.View>
              <Button
                text={"Leaderboard"}
                onPress={modal.onLeaderboard}
                style={{ marginVertical: 6 }}
              />
            </>
          ) : (
            <>
              <Animated.View
                entering={FlipInXDown.delay(400)}
                style={[
                  style.outer,
                  {
                    borderBottomStartRadius: 0,
                    borderBottomEndRadius: 0,
                    padding: 8,
                    width: "50%",
                    backgroundColor: "#35408E",
                    borderBottomWidth: 0
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
                  ]}
                >
                  Select Mode
                </Text>
              </Animated.View>

              <View style={[style.outer]}>
                <View style={[style.inner]}>
                  {/* X Button */}
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
                    <TouchableOpacity activeOpacity={0.7} onPress={handlesNo}>
                      <X width={42} height={42} />
                    </TouchableOpacity>
                  </View>

                  <Text style={[modalStyles.subtitle]}>{modal.subtitle.toUpperCase()}</Text>
                  <Animated.View
                    style={[
                      modalStyles.btnContainer,
                      {
                        flexDirection: "column",
                        marginTop: 2,
                        padding: 0,
                      },
                    ]}
                    entering={BounceIn}
                    exiting={BounceOut}
                  >
                    <TouchableOpacity onPress={handlesYes}>
                      <Animated.Image source={classic} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => modal.masteryFn()}>
                      <Animated.Image source={mastery} />
                    </TouchableOpacity>
                  </Animated.View>
                </View>
              </View>
            </>
          )}
        </Animated.View>
      </Animated.View>
    </>
  );
}

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
});
