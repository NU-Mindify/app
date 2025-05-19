import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useContext, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import AppBackground from "../../components/AppBackground";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { avatars } from "../../constants";
import AccountContext from "../../contexts/AccountContext";
import styles from "../../styles/styles";

const EditProfile = () => {
  const nav = useNavigation();
  const { accountData, setAccountData } = useContext(AccountContext);
  const [selectedAvatar, setSelectedAvatar] = useState(accountData.avatar);
  const Avatar = avatars[selectedAvatar];
  const [inputName, setInputName] = useState(accountData.username)
  const [selectedTab, setSelectedTab] = useState("Avatar")

  const onSave = async () => {
    try {
      const { data: updatedUser } = await axios.post(`${process.env.EXPO_PUBLIC_URL}/updateUser`, {
        avatar: selectedAvatar,
        username: inputName,
        user_id: accountData._id
      })
      setAccountData(updatedUser)
    } catch (error) {
      console.error("Error Updating User:", error);
    }
    nav.replace("Home");
  }

  return (
    <AppBackground>
      <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
        <View style={[styles.entryBackground, { padding: 8, width: "80%" }]}>
          <Text style={styles.entryTitle}>Edit Profile</Text>
        </View>
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
          <Input
            text={"Name"}
            style={{
              backgroundColor: "#2C519F",
              borderRadius: 24,
              boxShadow: "0px 2px 12px #EDE09480",
              borderWidth: 8,
              borderColor: "#FFD41C",
              width: "70%",
              marginTop: 20,
            }}
            inputStyle={styles.entryTitle}
            value={inputName}
            onChangeText={(text) => {
              setInputName(text);
            }}
          />
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
        <Tabs tabs={["Avatar", "Clothes"]} state={[selectedTab, setSelectedTab]} style={{flex: 0}} />
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "wrap",
            padding: 24,
            gap: 12,
          }}
        >
          {avatars.map((Avatar, index) => {
            return (
              <AvatarCard
                SVG={Avatar}
                key={index}
                selected={selectedAvatar === index}
                onPress={() => setSelectedAvatar(index)}
              />
            );
          })}
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            gap: 4,
            paddingHorizontal: 24,
            marginVertical: 24,
            marginTop: 12,
          }}
        >
          <Button
            style={{ flex: 0, width: "50%" }}
            onPress={onSave}
            text={"Save"}
          />
          <Button
            style={{ flex: 0, width: "50%" }}
            onPress={() => {
              nav.replace("View Profile");
            }}
            text={"Back"}
          />
        </View>
      </View>
    </AppBackground>
  );
};

export default EditProfile;

const AvatarCard = ({ SVG, selected, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: selected ? "#BBBBBB" : "white",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 8,
        borderColor: selected ? "#fff41c" : "#FFD41C",
        width: 100,
        height: 100,
      }}
    >
      <SVG width={60} height={60} />
    </Pressable>
  );
};


const Tabs = ({state, tabs, style}) => {
  const [mode, setMode] = state
  return (
    <View
      style={[{
        backgroundColor: "#F9EBDE",
        borderRadius: 24,
        padding: 6,
        borderWidth: 4,
        marginVertical: 6,
        marginHorizontal: 24,
        borderColor: "#2E5A9F",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: 'center',
        flex: 1,
        height: 60,
      }, style]}
    >
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab}
          style={[
            tabStyle.tab,
            mode === tab ? tabStyle.tabActive : {},
          ]}
          onPress={() => setMode(tab)}
        >
          <Text style={mode === tab ? tabStyle.textActive : tabStyle.text}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}
const tabStyle = {
  tab: { flex: 1, borderRadius: 12, padding: 12 },
  tabActive: { backgroundColor: "#2E5A9F" },
  text: { textAlign: "center", color: "#2E5A9F", fontWeight: "bold", },
  textActive: { color: "white", fontWeight: "bold", textAlign: "center" },
};