import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Platform, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import WebView from "react-native-webview";
import AppBackground from "../../components/AppBackground";

const disableZoomScript = `
      const meta = document.createElement('meta');
      meta.setAttribute('name', 'viewport');
      meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0');
      document.getElementsByTagName('head')[0].appendChild(meta);
    `;

const Mindmap = () => {
  const [input, setInput] = useState()
  const [showTemporaryMap, setShowTemporaryMap] = useState(false)
  const nav = useNavigation();
  return (
    <AppBackground>
      <Animated.View
        entering={FadeIn}
        style={{ flex: 1, paddingHorizontal: 8, marginTop:12 }}
      >
        <View
          style={{
            borderRadius: 24,
            flex: 1,
            borderColor: "black",
            borderWidth: 2,
            overflow: "hidden",
          }}
        >
          <WebView
            source={{
              uri: "https://nu-mindify.vercel.app/mindmap",
            }}
            scalesPageToFit={Platform.OS === "android" ? false : true}
            injectedJavaScript={disableZoomScript}
            scrollEnabled={false}
          />
        </View>
      </Animated.View>
    </AppBackground>
  );
};

export default Mindmap;

