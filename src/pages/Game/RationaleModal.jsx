import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useContext } from 'react'
import Animated, { BounceIn, BounceOut, FadeIn, FadeOut, ZoomOut } from 'react-native-reanimated'
import { modalStyles } from '../../styles/modalStyles'
import answerBanner from '../../assets/rationale/answerBanner.png'
import answerBody from '../../assets/rationale/answerBody.png'
import answerContinue from '../../assets/rationale/answerContinue.png'
import ModalContext from '../../contexts/ModalContext'
import { Body, Title } from '../../components/StartModal'
import Button from '../../components/Button'

export default function RationaleModal ({modal}) {
  
  return (
    <Animated.View
      style={modalStyles.modalBackground}
      entering={FadeIn}
      exiting={FadeOut}
    >
      <Animated.View
        style={modalStyles.card}
        entering={BounceIn.duration(500)}
        exiting={ZoomOut.duration(300)}
      >
        <Title title={modal.title} colors={modal.colors} />
        <Body colors={modal.colors} closeButton={false}>
          {modal.hasOwnProperty("isCorrect") && (
            <Text
              style={[
                modalStyles.subtitle,
                {
                  color: modal.isCorrect ? "green" : "red",
                  borderColor: modal.colors.primary_color,
                  borderWidth: 4,
                  borderRadius: 8,
                  margin:12,
                  padding: 16,
                },
              ]}
            >
              {modal.isCorrect ? "CORRECT" : "WRONG"}
            </Text>
          )}
          <Text
            style={[modalStyles.subtitle, { color: "black", fontSize:24, paddingBottom:0 }]}
          >
            {modal.subtitle}
          </Text>
          <Text style={[modalStyles.bodyText, { color: "black" }]}>
            {modal.body}
          </Text>
          <View
            style={modalStyles.btnContainer}
          >
            <Button text={"CONTINUE"} onPress={() => modal.primaryFn()} style={{width:'70%'}} />
          </View>
        </Body>
      </Animated.View>
    </Animated.View>
  );
}