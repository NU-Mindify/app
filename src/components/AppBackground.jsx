import { ImageBackground, StyleSheet } from "react-native";
import MindifyBackground from "../assets/bg.png";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import blur from "../anim/data.json";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigationState } from "@react-navigation/native";
import { navbarRoutes } from "../constants";

const AppBackground = ({
  children,
  style = {},
  source,
  viewStyle = {},
  gradientColors = [],
}) => {

  const routeName = useNavigationState((state) => {
    if (!state) {
      return "None";
    }
    return state.routes[state.index]?.name;
  });

  const getPaddingBottom = () => navbarRoutes.includes(routeName) ? 90 : 0

  if (gradientColors.length > 0) {
    return (
      <LinearGradient colors={gradientColors} style={[{ flex: 1 }, style]}>
        <SafeAreaView style={[{ flex: 1, width: "100%", paddingBottom: getPaddingBottom() }, viewStyle]}>
          {children}
        </SafeAreaView>
      </LinearGradient>
    );
  }
  return (
    <ImageBackground
      source={source || MindifyBackground}
      style={[{ flex: 1 }, style]}
      resizeMode="cover"
      resizeMethod="scale"
    >
      <SafeAreaView
        style={[
          { flex: 1, width: "100%", paddingBottom: getPaddingBottom() },
          viewStyle,
        ]}
      >
        <LottieView
          style={{
            display: source ? "none" : "flex",
            position: "absolute",
            width: 720,
            height: 1280,
            margin: "auto",
            zIndex: -1,
            marginTop: 0,
            opacity: 0.4,
          }}
          source={blur}
          autoPlay
          loop
        />

        {children}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default AppBackground;
