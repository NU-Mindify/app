import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import AppBackground from "../../components/AppBackground";
import styles from "../../styles/styles";
import Input from "../../components/Input";
import {
  MessageSquareTextIcon,
  SendHorizonal
} from "lucide-react-native";
import { Pressable } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import AccountContext from "../../contexts/AccountContext";
import X from "../../assets/generic/x.svg";
import axios from "axios";

const Chatbot = () => {
  const { accountData, setAccountData } = useContext(AccountContext);
  const scrollViewRef = useRef();

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const nav = useNavigation();

  const getData = async () => {
    const { data: messages } = await axios.get(`${process.env.EXPO_PUBLIC_URL}/getMessages/${accountData._id}`)
    setMessages(messages);
    console.log(messages);
    
  };
  useEffect(() => {
    getData();
  }, []);
  const sendMessage = async () => {
    setIsFetching(true);
    setMessages((currentMessages) => [
      ...currentMessages,
      { content: input, ai_generated: false },
    ]);
    try {
      const { data: ai_response } = await axios.post(`${process.env.EXPO_PUBLIC_URL}/sendMessage`,
        {
          user_id: accountData._id,
          message: input
        }
      )
      
      setMessages(currentMessages => [...currentMessages, ai_response]);
      setInput("");
    } catch (error) {
      
    }
    setIsFetching(false);
  };
  const formatAIText = (message) => {
    return message.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\*(.+?)/g, "• ");
  };
  return (
    <AppBackground style={{ padding: 28 }}>
      <View
        style={[
          styles.entryBackground,
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 0,
          },
        ]}
      >
        <Text style={[styles.entryBody, { fontSize: 24, fontWeight: "bold" }]}>
          Chatbot
        </Text>
        <Pressable onPress={() => nav.goBack()}>
          <X width={32} height={32} />
        </Pressable>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          backgroundColor: "#F9EBDE",
          flex: 1,
          borderRadius: 24,
          padding: 24,
        }}
      >
        <ScrollView 
          style={{ flex: 1 }} 
          ref={scrollViewRef} 
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        >
          {messages.map((message, index) => (
            <View
              key={index}
              style={[
                {
                  marginBottom: 12,
                  padding: 12,
                  borderRadius: 12,
                  maxWidth: 500,
                },
                message.ai_generated
                  ? {
                      backgroundColor: "#2E5A9F",
                    }
                  : {
                      backgroundColor: "#FFC300",
                      marginStart: "auto",
                    },
              ]}
            >
              <Text style={{ color: message.ai_generated ? "white" : "black" }}>
                {formatAIText(message.content)}
              </Text>
            </View>
          ))}
        </ScrollView>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Input
            placeholder={"Type a message"}
            Icon={MessageSquareTextIcon}
            onChangeText={(text) => setInput(text)}
            value={input}
            disabled={isFetching}
          >
            <Pressable onPress={sendMessage} disabled={isFetching}>
              <View
                style={[
                  styles.button,
                  isFetching && { backgroundColor: "#c4c4c4" },
                ]}
              >
                <SendHorizonal color={"black"} />
              </View>
            </Pressable>
          </Input>
        </View>
      </KeyboardAvoidingView>
    </AppBackground>
  );
};

export default Chatbot;
