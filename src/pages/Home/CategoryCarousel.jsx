import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Image,
} from "react-native";
import React, { useContext, useState } from "react";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import ModalContext from "../../contexts/ModalContext";
import { useNavigation } from "@react-navigation/native";
import {
  categoriesObj,
  _primary_color,
  _secondary_color,
} from "../../constants";
import Button from "../../components/Button";

import AccountContext from "../../contexts/AccountContext";
import smallStar from '../../assets/results/smallStar.png'

const { width } = Dimensions.get("window");
const _imageWidth = width * 0.8;
const _imageHeight = _imageWidth * 1.76;
const _spacing = 0;

const CategoryCarousel = () => {
  const nav = useNavigation();

  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x / (_imageWidth + _spacing);
  });
  const { progressData } = useContext(AccountContext);
  const { setModal } = useContext(ModalContext);

  return (
    <>
      <View style={{ flex: 1 }}>
        <Animated.FlatList
          data={categoriesObj}
          horizontal
          renderItem={({ item, index }) => (
            <Photo
              item={item.cover}
              index={index}
              scrollX={scrollX}
              onPress={(index) => {
                setModal({
                  title: "Start",
                  subtitle: item.name,
                  body: "Start to take the quiz?",
                  primaryFn: () => {
                    nav.navigate("Levels", {
                      categoryIndex: item,
                    });
                    setModal(null);
                  },
                  masteryFn: () => {
                    nav.navigate("Levels", {
                      categoryIndex: item,
                      isMastery: true,
                    });
                    setModal(null);
                  },
                  secondaryFn: () => {
                    setModal(null);
                  },
                });
              }}
            />
          )}
          snapToInterval={_imageWidth + _spacing}
          decelerationRate={"fast"}
          contentContainerStyle={{
            gap: _spacing,
            paddingHorizontal: (width - _imageWidth) / 2,
            marginBottom: "auto",
          }}
          style={{ flex: 1 }}
          onScroll={onScroll}
          scrollEventThrottle={1000 / 60}
          showsHorizontalScrollIndicator={false}
          removeClippedSubviews={false}
        />
      </View>
    </>
  );
};

export default CategoryCarousel;

const Photo = ({ item, index, scrollX, onPress }) => {
  const {progressData} = useContext(AccountContext)
  const imageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            Platform.OS === "ios" ? [1, 1, 1] : [1.5, 1, 1.5]
          ),
        },
        {
          rotate: `${interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            Platform.OS === "ios" ? [0, 0, 0] : [20, 0, -20]
          )}deg`,
        },
      ],
    };
  });
  const imageContainerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          scrollX.value,
          [index - 1, index, index + 1],
          Platform.OS === "ios" ? [1, 1, 1] : [0.85, 1, 0.85]
        ),
      },
    ],
  }));
  return (
    <TouchableOpacity
      style={{ marginVertical: "auto" }}
      onPress={() => onPress(index)}
      activeOpacity={0.9}
    >
      <Animated.View
        style={[
          {
            backgroundColor: "#2D3678",
            borderColor: _secondary_color,
            borderWidth: 6,
            padding: 12,
            borderRadius: 24,
            width: _imageWidth,
            height: "100%",
          },
          imageContainerStyle,
        ]}
      >
        <View
          style={{
            backgroundColor: "#406FC7",
            flex: 1,
            padding: 8,
            borderRadius: 24,
            marginBottom: 12,
          }}
        >
          <View style={[worldStyle.worldNameContainer]}>
            <Text style={worldStyle.worldName} allowFontScaling={false}>
              {categoriesObj[index].name}
            </Text>
          </View>
          <Animated.View
            style={[
              {
                width: "90%",
                flex: 1,
                overflow: "hidden",
                borderRadius: 16,
                boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.8)",
                margin: "auto",
                marginBottom: 12,
              },
              imageContainerStyle,
            ]}
          >
            <Animated.Image
              resizeMode={"cover"}
              source={item}
              style={[{ flex: 1, width: "100%" }, imageStyle]}
            />
            <View
              style={{
                alignItems: "center",
                gap: 4,
                backgroundColor: "white",
                justifyContent: "space-evenly",
                flexDirection: "row",
                position: "absolute",
                paddingHorizontal:24,
                bottom: 5,
                left: "50%",
                transform: [{ translateX: "-50%" }],
                borderRadius: 20,
                borderColor:_primary_color,
                borderWidth:6
              }}
            >
              <Image
                source={smallStar}
                style={[
                  {
                    height: 50,
                    width: 40,
                  },
                ]}
                resizeMode="contain"
              />
              <Text style={{fontFamily:'LilitaOne-Regular', fontSize:26, color:'#2E5A9F' }}>{Object.values(progressData.high_scores[categoriesObj[index].id]).reduce((sum, score) => sum + score.stars, 0)}/30</Text>
            </View>
          </Animated.View>
        </View>
        <View>
          <Button
            text={"Play"}
            style={{ width: "80%", marginHorizontal: "auto" }}
            onPress={() => onPress(index)}
          />
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const worldStyle = StyleSheet.create({
  worldName: {
    textAlign: "center",
    color: "white",
    fontSize: 24,
    fontFamily: "LilitaOne-Regular",
  },
  worldNameContainer: {
    paddingVertical: 8,
  },
});
