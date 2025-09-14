import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { Search } from 'lucide-react-native'
import { useContext, useState } from 'react'
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import Input from '../../components/Input.jsx'
import { API_URL, avatars, branches } from '../../constants'
import AccountContext from '../../contexts/AccountContext'
import ModalContext from '../../contexts/ModalContext'
import { Body, Title } from '../StartModal'

const SearchStudent = () => {
  const {modal, setToast} = useContext(ModalContext)
  const [searchText, setSearchText] = useState("");
  const [searchList, setSearchList] = useState([]);

  const onSearch = async (text) => {
    if (text.length === 0) {
      setSearchList([]);
      return;
    }
    try {
      const {data} = await axios.get(API_URL+"/searchUser?name="+text)
      setSearchList(data);
    } catch (error) {
      console.error("SEARCH",error);
      setToast("Failed to search.")
    }
  }
  return (
    <>
      <Title title={"SEARCH"} />
      <Body
        onClose={modal.secondaryFn}
        contentStyle={{ padding: 24, width: '90%', height: searchList.length !== 0 ? 600: 200, gap: 12 }}
      >
        <Input style={{marginTop: 12}} value={searchText} onChangeText={(text) => {setSearchText(text); onSearch(text)}} placeholder={"Search for student..."}>
          <TouchableOpacity onPress={() => {
            if (searchText.trim() ==="") {
              setToast("Please fill field with a name.")
              return;
            }
            onSearch(searchText);
          }}
          >
            <View>
              <Search color={"black"} />
            </View>
          </TouchableOpacity>
        </Input>
        <ScrollView style={{width:'100%', padding:4}}>
          {searchList.length === 0 && searchText.length === 0 &&
            <Text style={{color: 'white', fontWeight:600, fontSize:16, textAlign:'center'}}>Search for the name of the student</Text>
          }
          {searchList.length === 0 && searchText.length !== 0 &&
            <Text style={{color: 'white', fontWeight:600, fontSize:16, textAlign:'center'}}>No Results</Text>
          }
          {searchList.map((student, index) => <UserCard data={student} key={index} />)}
        </ScrollView>
      </Body>
    </>
  );
}

export default SearchStudent

const UserCard = ({ data }) => {
  const {setModal} = useContext(ModalContext)
  const {accountData} = useContext(AccountContext)
  const Avatar =
    avatars.find((avatar) => avatar.id === data.avatar)?.head ||
    avatars[0].head;
  const nav = useNavigation();
  if (accountData._id === data._id){
    return null
  }
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          nav.navigate("View Other Profile", { user_id: data._id });
          setModal(null)
        }}
        style={[
          {
            backgroundColor: "#FBF0EE",
            borderColor: "white",
            boxShadow: `0px 2px 6px black`,
            borderWidth: 2,
            marginBottom: 8,
            padding: 6,
            paddingHorizontal: 12,
            borderRadius: 12,
            width: 300,
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            height: 64,
          }}
        >
          <Avatar width={50} height={60} />
          <View>
            <Text style={{ fontSize: 20, marginStart: 12, fontWeight: 800 }}>
              {data.first_name} {data.last_name}
            </Text>
            <Text style={{ fontSize: 12, marginStart: 12 }}>
              {branches.find((branch) => branch.id === data.branch).name} -{" "}
              <Text style={{color:'gray'}}>
                {data.username}
              </Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};
