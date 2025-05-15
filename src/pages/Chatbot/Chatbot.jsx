import { View, Text, ScrollView, KeyboardAvoidingView, Platform, ToastAndroid } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import AppBackground from "../../components/AppBackground";
import styles from "../../styles/styles";
import Input from "../../components/Input";
import {
  ArrowLeftCircle,
  MessageCircleX,
  MessageSquareTextIcon,
  SendHorizonal,
  Trash2
} from "lucide-react-native";
import { Pressable, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import AccountContext from "../../contexts/AccountContext";
import X from "../../assets/generic/X-White.svg";
import axios from "axios";
import { API_URL } from "../../constants";

const Chatbot = () => {
  const { accountData, setAccountData } = useContext(AccountContext);
  const scrollViewRef = useRef();

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const nav = useNavigation();

  const getData = async () => {
    const { data: messages } = await axios.get(API_URL+`/getMessages/${accountData._id}`)
    setMessages(messages);
    console.log(messages);
  };
  const deleteAll = async () => {
    try {
      const { data: result } = await axios.post(API_URL+"/deleteAllMessages", {
        user_id: accountData._id
      })
      console.log(result);
      getData();
    } catch (error) {
      console.error("Deleteing Message error", error);
      ToastAndroid.show("Failed to Delete", ToastAndroid.LONG);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  const sendMessage = async () => {
    setIsFetching(true);
    const inputToSend = input;
    setInput("")
    setMessages((currentMessages) => [
      ...currentMessages,
      { content: inputToSend, ai_generated: false },
    ]);
    try {
      const { data: ai_response } = await axios.post(API_URL+`/sendMessage`,
        {
          user_id: accountData._id,
          message: inputToSend
        }
      )
      
      setMessages(currentMessages => [...currentMessages, ai_response]);
    } catch (error) {
      setInput(inputToSend);
    }
    setIsFetching(false);
  };
  
  return (
    <AppBackground
      gradientColors={["#3B61B7", "#35408E"]}
      style={{ paddingHorizontal: 12, paddingBottom: 24 }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 14,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            if (nav.canGoBack()) {
              nav.goBack();
            } else {
              nav.replace("Home");
            }
          }}
        >
          <ArrowLeftCircle size={32} color={"white"} />
        </TouchableOpacity>
        <Text style={[styles.entryTitle, { fontSize: 32 }]}>MINDIBOT</Text>
        <TouchableOpacity
          onPress={() => {
            deleteAll();
          }}
        >
          <Trash2 size={32} color={"white"} />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          backgroundColor: "#E5E5E5",
          flex: 1,
          borderRadius: 24,
          padding: 24,
          paddingBottom: 12,
          margin: 8,
        }}
      >
        <ScrollView
          style={{ flex: 1, borderRadius: 12 }}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
        >
          {messages.length === 0 && (
            <View style={{ position: "relative", top: 200, width: "100%" }}>
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "LilitaOne-Regular",
                  fontSize: 32,
                }}
              >
                Hello {accountData.first_name}!
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  textAlign: "center",
                  width: "70%",
                  marginHorizontal: "auto",
                  marginTop: 12,
                  fontWeight: 600,
                }}
              >
                Time to sharpen your understanding of the mind.
              </Text>
            </View>
          )}
          {messages.map((message, index) => (
            <Message message={message} key={index} index={index} />
          ))}
        </ScrollView>
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
          <Input
            placeholder={"Ask Mindibot..."}
            onChangeText={(text) => setInput(text)}
            value={input}
            disabled={isFetching}
            style={{ borderRadius: 8 }}
            multiline={true}
            numberOfLines={4}
            rows={4}
          >
            <TouchableOpacity onPress={sendMessage} disabled={isFetching}>
              <View style={[isFetching && { backgroundColor: "#c4c4c4" }]}>
                <SendHorizonal color={"black"} />
              </View>
            </TouchableOpacity>
          </Input>
        </View>
      </KeyboardAvoidingView>
    </AppBackground>
  );
};

export default Chatbot;

const formatAIText = (message) => {
  return message.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\*(.+?)/g, "• ");
};

const Message = ({message}) => {
return (
  <View
    style={[
      {
        marginBottom: 12,
        padding: 12,
        borderRadius: 12,
        maxWidth: 500,
      },
      message.ai_generated
        ? {
            backgroundColor: "#35408E",
            borderBottomLeftRadius: 0,
            marginRight: 32,
          }
        : {
            backgroundColor: "#99B7ED",
            marginStart: "auto",
            borderBottomRightRadius: 0,
          },
    ]}
  >
    <Text
      style={{
        color: message.ai_generated ? "white" : "black",
        fontFamily: message.ai_generated ? "Poppins-Regular" : "Poppins-Medium",
      }}
    >
      {formatAIText(message.content)}
    </Text>
  </View>
);
}