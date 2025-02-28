import {
  View,
  Text,
  Pressable,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import AppBackground from "../../components/AppBackground";
import styles from "../../styles/styles";
import Button from "../../components/Button";
import LevelTitle from "../../assets/level/levelTitle.svg";
import { useNavigation } from "@react-navigation/native";
import { avatars, categories } from "../../constants";
import AccountContext from "../../contexts/AccountContext";
import Input from "../../components/Input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Edit } from "lucide-react-native";

const ViewProfile = () => {
  const nav = useNavigation();
  const { accountData, setAccountData } = useContext(AccountContext);
  const [selectedAvatar, setSelectedAvatar] = useState(accountData.avatar);
  const Avatar = avatars[selectedAvatar];
  const [inputName, setInputName] = useState(accountData.username);

  const onSave = async () => {
    try {
      const accountsStorage = (await AsyncStorage.getItem("accounts")) || "[]";
      const jsonAccounts = JSON.parse(accountsStorage);

      let usernameDuplicate = false;
      jsonAccounts.map((account) => {
        if (accountData.id !== account.id && inputName === account.username) {
          usernameDuplicate = true;
        }
      });
      if (usernameDuplicate) {
        ToastAndroid.show("Username already exist.", ToastAndroid.SHORT);
        return;
      }
    } catch (error) {
      console.error(error);
    }

    const newData = {
      ...accountData,
      avatar: selectedAvatar,
      username: inputName,
    };
    setAccountData(newData);
    nav.goBack();
  };

  return (
    <AppBackground>
      <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 99,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 8,
              borderColor: "#FFD41C",
              width: 160,
              height: 160,
            }}
          >
            <Avatar width={120} height={120} />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 20,
              alignItems: "center",
              gap: 4,
            }}
          >
            <Text
              style={{
                backgroundColor: "#2C519F",
                borderRadius: 24,
                boxShadow: "0px 2px 12px #EDE09480",
                borderWidth: 8,
                borderColor: "#FFD41C",
                width: 250,
                textAlign: "center",
                padding: 12,
                color: "white",
                fontWeight: 900,
                fontSize: 24,
              }}
              inputStyle={styles.entryTitle}
            >
              {accountData.username}
            </Text>
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => {
                nav.navigate("Edit Profile");
              }}
            >
              <Edit size={24} color={"black"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Split */}
      <View
        style={{
          borderTopColor: "#FDD116",
          borderTopWidth: 6,
          backgroundColor: "#273574",
          justifyContent: "center",
          alignItems: "center",
          flex: 3,
        }}
      >
        <View
          style={{ justifyContent: "center", position: "absolute", top: -40 }}
        >
          <LevelTitle style={{ marginHorizontal: "auto" }} />
          <Text
            style={[
              styles.entryTitle,
              { position: "absolute", textAlign: "center", width: "100%" },
            ]}
          >
            Progress
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
          }}
        >
          {categories.map((category, index) => (
            <CategoryCard
              name={category}
              percent={Math.floor((accountData.progress[index] / 5) * 100)}
              key={index}
            />
          ))}
        </View>
        <Button
          style={{ flex: 0, width: "50%", marginTop: 12 }}
          onPress={() => {
            nav.goBack();
          }}
          text={"Back"}
        />
      </View>
    </AppBackground>
  );
};

export default ViewProfile;

const CategoryCard = ({ name, percent }) => {
  return (
    <View
      style={{
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "black",
        width: 300,
        padding: 8,
        borderRadius: 12,
        borderWidth: 4,
      }}
    >
      <Text>{name}</Text>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#273574",
          width: "100%",
          borderRadius: 12,
        }}
      >
        <View
          style={{
            width: `${percent}%`,
            height: 20,
            backgroundColor: "green",
            borderRadius: 12,
          }}
        >
          <Text
            style={{ color: "white", fontWeight: 800, textAlign: "center" }}
          >
            {percent}%
          </Text>
        </View>
        {percent < 10 && (
          <Text
            style={{
              color: "white",
              fontWeight: 800,
              textAlign: "center",
              paddingHorizontal: 8,
            }}
          >
            {percent}%
          </Text>
        )}
      </View>
    </View>
  );
};
