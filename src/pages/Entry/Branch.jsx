import { Check } from 'lucide-react-native'
import { Text, View, Pressable, ScrollView } from "react-native";
import Animated from 'react-native-reanimated'
import { Body } from '../../components/StartModal'
import { modalStyles } from '../../styles/modalStyles'

const Branch = ({branches, setSelected, onClose, selected, isOpen = true}) => {
  if(!branches){
    onClose()
    return;
  }
  console.log(branches);
  
  return (
    <Animated.View
      style={[
        modalStyles.modalBackground,
        {
          display: isOpen ? "flex" : "none",
          backgroundColor: "rgba(0,0,0,0.9)",
        },
      ]}
    >
      <Body
        onClose={onClose}
        contentStyle={{
          padding: 24,
          paddingHorizontal: 12,
          width: 300,
          height: 600,
          gap: 12,
        }}
      >
        <Text
          style={{
            color: "white",
            fontFamily: "LilitaOne-Regular",
            fontSize: 28,
          }}
        >
          Select Branch
        </Text>
        <ScrollView contentContainerStyle={{ gap: 8 }}>
          {branches &&
            branches.map((branch, index) => (
              <BranchItem branch={branch} key={index} isSelected={selected?.id === branch.id} onPress={() => {setSelected(branch); onClose()}} />
            ))}
        </ScrollView>
      </Body>
    </Animated.View>
  );
}

const BranchItem = ({branch, onPress, isSelected}) => {
  console.log(branch);
  const hexColor = isSelected ? "#808080" : "#FFFFFF";
  return (
    <Pressable onPress={() => isSelected ? null : onPress()} 
      style={({ pressed }) => [
        { borderWidth:3, borderRadius:12, backgroundColor: pressed ? hexColor + "AA" : hexColor },
      ]}>
      <View style={{flexDirection:'row', width:250, padding:12}}>
        <Text style={{marginEnd:'auto'}}>{branch.name}</Text>
        {isSelected &&
          <Check size={14} />
        }
      </View>
    </Pressable>
  )
}

export default Branch