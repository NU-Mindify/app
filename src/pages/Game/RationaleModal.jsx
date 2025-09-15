import { Image, Text, View, ScrollView } from "react-native";
import Animated, { BounceIn, FadeIn, FadeOut, ZoomOut } from 'react-native-reanimated'
import Button from '../../components/Button'
import { Body, Title } from '../../components/StartModal'
import { modalStyles } from '../../styles/modalStyles'

export default function RationaleModal ({modal}) {
  
  return (
    <Animated.View
      style={modalStyles.modalBackground}
      entering={FadeIn}
      exiting={FadeOut}
    >
      <View
        style={[modalStyles.card]}
        entering={BounceIn.duration(500)}
        exiting={ZoomOut.duration(300)}
      >
        <Title title={modal.title} colors={modal.colors} />
        <Body
          colors={modal.colors}
          closeButton={false}
          contentStyle={{maxHeight:600}}
        >
          <ScrollView
          style={{flexGrow:0}}
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {modal.hasOwnProperty("isCorrect") && (
              <Text
                style={[
                  modalStyles.subtitle,
                  {
                    color: modal.isCorrect ? "green" : "red",
                    borderColor: modal.colors.primary_color,
                    borderWidth: 4,
                    borderRadius: 8,
                    margin: 12,
                    padding: 16,
                  },
                ]}
              >
                {modal.isCorrect ? "CORRECT" : "WRONG"}
              </Text>
            )}
            <Text
              style={[
                modalStyles.subtitle,
                { color: "black", fontSize: 24, paddingBottom: 0 },
              ]}
            >
              {modal.subtitle}
            </Text>
            {modal.filepath && (
              <Image
                source={{ uri: modal.filepath }}
                width={100}
                height={100}
                style={{ width: 100, height: 100, paddingTop: 4 }}
                resizeMode="cover"
              />
            )}
            {modal.body && (
              <Text style={[modalStyles.bodyText, { color: "black" }]}>
                {modal.body}
              </Text>
            )}
          </ScrollView>
          <View style={[modalStyles.btnContainer]}>
            <Button
              text={"CONTINUE"}
              onPress={() => modal.primaryFn()}
              style={{ width: "70%" }}
            />
          </View>
        </Body>
      </View>
    </Animated.View>
  );
}