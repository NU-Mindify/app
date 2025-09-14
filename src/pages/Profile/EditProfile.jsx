import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useContext, useState } from "react";
import { Pressable, Text, View, ScrollView } from "react-native";
import AppBackground from "../../components/AppBackground";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { avatars, clothes } from "../../constants";
import AccountContext from "../../contexts/AccountContext";
import styles from "../../styles/styles";
import Avatar from "../../components/Avatar";
import ModalContext from "../../contexts/ModalContext";

const EditProfile = () => {
  const nav = useNavigation();
  const { accountData, setAccountData } = useContext(AccountContext);
  const {setToast} = useContext(ModalContext)
  const [selectedAvatar, setSelectedAvatar] = useState(accountData.avatar);
  const [selectedCloth, setSelectedCloth] = useState(accountData.cloth || clothes[0].id);
  const Head = avatars.find((avatar) => avatar.id === selectedAvatar).body;
  const Cloth = clothes.find((cloth) => cloth.id === selectedCloth).image;
  const [inputName, setInputName] = useState(accountData.username)
  const [selectedTab, setSelectedTab] = useState("Avatar")

  const onSave = async () => {
    try {
      const { data: updatedUser } = await axios.post(`${process.env.EXPO_PUBLIC_URL}/updateUser`, {
        avatar: selectedAvatar,
        cloth: selectedCloth,
        username: inputName,
        user_id: accountData._id
      });
      setAccountData(updatedUser);
      setToast("The changes has been saved.");

      nav.replace("Home");
    } catch (error) {
      console.error("Error Updating User:", error);
      setToast("Failed to save changes.");
    }
  };


  return (
    <AppBackground>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={[styles.entryBackground, { padding: 8, width: "80%" }]}>
          <Text style={styles.entryTitle}>Edit Profile</Text>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Avatar Head={Head} Cloth={Cloth} size={1} />
        </View>
      </View>
      {/* Split */}
      <View
        style={{
          borderTopColor: "#FDD116",
          borderTopWidth: 6,
          backgroundColor: "#273574",
          flex: 1,
        }}
      >
        <Tabs
          tabs={["Avatar", "Clothes"]}
          state={[selectedTab, setSelectedTab]}
          style={{  }}
        />
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
          {selectedTab === "Avatar" &&
            avatars.map((Avatar, index) => {
              if(!accountData.items.includes(Avatar.id)){
                return null
              }
              return (
                <AvatarCard
                  SVG={Avatar.head}
                  key={index}
                  selected={selectedAvatar === Avatar.id}
                  onPress={() => setSelectedAvatar(Avatar.id)}
                />
              );
            })}
          {selectedTab === "Clothes" &&
            clothes.map((cloth, index) => {
              if (!accountData.items.includes(cloth.id)) {
                return null;
              }
              return <AvatarCard
                SVG={cloth.image}
                key={index}
                selected={cloth.id === selectedCloth}
                onPress={() => setSelectedCloth(cloth.id)}
              />
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
        height:70
      }, style]}
    >
      {tabs.map(tab => (
        <Pressable
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
        </Pressable>
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