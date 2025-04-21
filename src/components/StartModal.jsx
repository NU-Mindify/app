import { Text, TouchableOpacity, View } from "react-native";
import Animated, {
  BounceIn,
  BounceOut,
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
  ZoomIn,
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
import X from "../assets/generic/X-White.svg";

export default function Start() {
  const { modal, setModal } = useContext(ModalContext);
  function handlesYes() {
    modal.primaryFn();
  }

  function handlesNo() {
    modal.secondaryFn();
  }

  return (
    // {/* <View style={[Styles.mainCont, { paddingTop: Constants.statusBarHeight }]}> */}
    <>
      <Animated.View
        style={modalStyles.modalBackground}
        entering={FadeIn}
        exiting={FadeOut}
      >
        <Animated.View
          style={modalStyles.card}
          entering={BounceIn.duration(500)}
          exiting={ZoomOut.duration(300)}
        >
          <Animated.Image source={ModalBg} style={modalStyles.imageStyle} />
          {modal.mode === "LevelSelect" ? (
            <>
              <Text style={modalStyles.subtitle}>{modal.subtitle}</Text>
              <Text style={modalStyles.bodyText}>{modal.body}</Text>
              <Animated.View
                style={modalStyles.btnContainer}
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
            </>
          ) : (
            <>
              {/* <Text style={[modalStyles.bodyText, {marginTop:2, fontSize:8}]}>{modal.body}</Text> */}
              <Animated.View
                entering={ZoomIn}
                exiting={ZoomOut}
                style={[
                  {
                    marginHorizontal: "auto",
                    borderRadius: 24,
                    padding: 12,
                    zIndex: 4,
                    position: "absolute",
                    top: -15,
                    right: -20,
                  },
                ]}
              >
                <TouchableOpacity activeOpacity={0.7} onPress={handlesNo}>
                  <X width={30} height={30} />
                </TouchableOpacity>
              </Animated.View>
              <Text style={[modalStyles.subtitle, {paddingHorizontal:12}]}>{modal.subtitle}</Text>
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
              <View
                style={{
                  position: "absolute",
                  bottom: "-36%",
                  width: "100%",
                }}
              ></View>
            </>
          )}
        </Animated.View>
      </Animated.View>
    </>
  );
}
