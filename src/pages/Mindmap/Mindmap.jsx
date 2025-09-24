import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Platform, View, Text } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import WebView from "react-native-webview";
import AppBackground from "../../components/AppBackground";
import { Bot } from "lucide-react-native";

const disableZoomScript = `
      const meta = document.createElement('meta');
      meta.setAttribute('name', 'viewport');
      meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0');
      document.getElementsByTagName('head')[0].appendChild(meta);
    `;

const Mindmap = () => {
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
          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'white'}}>
          <Bot />
          <Text style={{fontSize:12, textAlign:'center', paddingVertical:12}}> Please double-check the information, as mistakes can occur.</Text>
        </View>
        </View>
      </Animated.View>
    </AppBackground>
  );
};

export default Mindmap;

