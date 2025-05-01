import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import AppBackground from '../../components/AppBackground';
import styles from '../../styles/styles';
import { modalStyles } from '../../styles/modalStyles';
import X from "../../assets/generic/x.svg";
import Animated, { FadeIn } from 'react-native-reanimated';
import Checked from "../../assets/form/checked.svg";
import Unchecked from "../../assets/form/unchecked.svg";

const TermsAndConditions = ({onClose, isOpen, toggleCheckbox, checkbox}) => {
  const nav = useNavigation()
  return (
    <Animated.View
      entering={FadeIn}
      style={[
        modalStyles.modalBackground,
        {
          display: isOpen ? "flex" : "none",
          backgroundColor: "rgba(0,0,0,0.9)",
        },
      ]}
    >
      <View style={{ width: "90%", height: "85%", margin: 24 }}>
        <View
          style={[
            {
              zIndex: 4,
              position: "absolute",
              top: -10,
              right: -10,
            },
          ]}
        >
          <TouchableOpacity activeOpacity={0.7} onPress={onClose}>
            <X width={40} height={40} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, borderRadius: 24, overflow: "hidden" }}>
          <WebView
            style={{}}
            source={{
              uri: "https://nu-mindify.vercel.app/terms-and-conditions",
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
            width: "90%",
            margin: "auto",
            backgroundColor: "#2C519F",
            padding: 12,
            borderRadius: 12,
            marginTop: 8,
            borderWidth: 4,
            borderColor: "#FFD41C",
          }}
        >
          <TouchableOpacity onPress={toggleCheckbox}>
            {checkbox ? <Checked /> : <Unchecked />}
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1 }} onPress={toggleCheckbox}>
            <Text style={{ color: "white", fontSize: 12 }}>
              I accept and acknowledge the{" "}
              <Text style={textHighlight}>Data Privacy Consent</Text> and the{" "}
              <Text style={textHighlight}>Terms and Conditions</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

export default TermsAndConditions

const textHighlight = {
  color: "#FDB813",
  fontWeight: "bold",
};
