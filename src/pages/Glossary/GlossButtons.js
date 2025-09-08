import { Image, Pressable, Text } from "react-native";
import Animated from "react-native-reanimated";
import { GStyle } from "./GStyle";
import button from '../../assets/glossary/button.png'

export default function GlossButtons(props) {
    const { letter, id, onPress } = props;

    return (
        <Animated.View style={GStyle.btnStyle} key={id}>
            <Pressable onPress={onPress} style={GStyle.btnStyle}>
                <Text style={GStyle.btnTxt}>{letter}</Text>
            </Pressable>
        </Animated.View>
    );
}