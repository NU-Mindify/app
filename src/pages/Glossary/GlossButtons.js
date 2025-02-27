import { Image, Text, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";
import { GStyle } from "./GStyle";
import button from '../../assets/glossary/button.png'

export default function GlossButtons(props) {
    const { letter, id, onPress } = props;

    return (
        <Animated.View style={GStyle.btnStyle} key={id}>
            <TouchableOpacity onPress={onPress} style={GStyle.btnStyle}>
                <Image source={button} style={GStyle.imageBtn}></Image>
                <Text style={GStyle.btnTxt}>{letter}</Text>
            </TouchableOpacity>
        </Animated.View>
    );
}