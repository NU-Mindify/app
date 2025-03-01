import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { Pressable, ScrollView } from "react-native-gesture-handler";
import { BrainCircuitIcon, Search } from "lucide-react-native";
import X from "../../assets/generic/x.svg";
import AppBackground from "../../components/AppBackground";
import styles from "../../styles/styles";
import { useNavigation } from "@react-navigation/native";
import Animated, { SlideInUp, ZoomIn, ZoomOut } from "react-native-reanimated";
import Input from "../../components/Input";
import MindmapImage from '../../assets/mindmap/mindmap.png'

const Mindmap = () => {
  const [input, setInput] = useState()
  const [showTemporaryMap, setShowTemporaryMap] = useState(false)
  const nav = useNavigation();
  return (
    <AppBackground>
      <Animated.View
        entering={ZoomIn}
        exiting={ZoomOut}
        style={{ flex: 1, padding: 28, paddingHorizontal: 8 }}
      >
        <View
          style={[
            styles.entryBackground,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 0,
              marginBottom: 12,
            },
          ]}
        >
          <Text
            style={[styles.entryBody, { fontSize: 24, fontWeight: "bold" }]}
          >
            Mind Map
          </Text>
          <TouchableOpacity onPress={() => nav.goBack()}>
            <X width={32} height={32} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: "#F9EBDE",
            flex: 1,
            borderRadius: 24,
            padding: 24,
            borderWidth: 8,
            borderColor: "#2E5A9F",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderColor: "black",
            }}
          >
            <Input
              placeholder={"Type a message"}
              Icon={BrainCircuitIcon}
              onChangeText={(text) => setInput(text)}
              value={input}
              style={{ borderWidth: 2, borderRadius: 24 }}
            >
              <Pressable
                onPress={() => {
                  setShowTemporaryMap(true);
                }}
              >
                <View style={[styles.button]}>
                  <Search color={"black"} />
                </View>
              </Pressable>
            </Input>
          </View>
          <ScrollView style={{ flex: 1 }}>
            <ScrollView horizontal={true}>
              {showTemporaryMap && (
                <Animated.View entering={SlideInUp}>
                  <Image source={MindmapImage} resizeMode="contain" />
                </Animated.View>
              )}
            </ScrollView>
          </ScrollView>
        </View>
      </Animated.View>
    </AppBackground>
  );
};

export default Mindmap;

