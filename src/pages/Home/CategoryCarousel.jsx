import { View, Text, Dimensions, TouchableOpacity, Platform } from 'react-native'
import React, { useContext, useState } from 'react'
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import styles from '../../styles/styles';
import ModalContext from '../../contexts/ModalContext';
import { useNavigation } from '@react-navigation/native';
import { categoriesObj } from '../../constants'

import AccountContext from '../../contexts/AccountContext';
// const data = [
//   category1,
//   map2,
//   map4,
//   map2,
//   category1
// ]
// const data = [
//   category1,
//   category2,
//   category3,
//   category4,
//   category5
// ];

const {width} = Dimensions.get('window')
const _imageWidth = width * 0.7;
const _imageHeight = _imageWidth * 1.76;
const _spacing = 12


const CategoryCarousel = () => {
  const nav = useNavigation()

  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x / (_imageWidth + _spacing);
  });
  const {progressData} = useContext(AccountContext);
  const {setModal} = useContext(ModalContext)

  return (
    <>
      <View style={{ flex: 1 }}>
        <Animated.FlatList
          data={categoriesObj}
          horizontal
          renderItem={({
            item,
            index,
          }) => (
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

export default CategoryCarousel


const Photo = ({item, index, scrollX, onPress}) => {
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
            Platform.OS === 'ios' ? 
            [0, 0, 0] :
            [20, 0, -20]
          )}deg`,
        },
      ],
    };
  });
  const imageContainerStyle = useAnimatedStyle(() => ({
    transform:[
      {
        scale: interpolate(
          scrollX.value,
          [index - 1, index, index + 1],
          Platform.OS === 'ios' ? 
          [1, 1, 1] :
          [0.80, 1, 0.80]
        )
      }
    ]
  }))
  return (
    <TouchableOpacity onPress={() => onPress(index)} activeOpacity={0.9} >
      <Animated.View
        style={[
          {
            width: _imageWidth,
            height: _imageHeight,
            overflow: "hidden",
            borderRadius: 16,
            boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.8)",
          },
          imageContainerStyle,
        ]}
      >
        <Animated.Image
          resizeMode={"cover"}
          source={item}
          style={[{ flex: 1, width: "100%", height: "100%" }, imageStyle]}
        />
      </Animated.View>
      <View
        style={[
          styles.entryBackground,
          {
            backgroundColor: "#2C519F",
            width: "80%",
            position:'absolute',
            bottom:40,
            left:'50%',
            transform: [{translateX:'-50%'}],
            paddingVertical:8
          },
        ]}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 24,
            fontFamily:'LilitaOne-Regular'
          }}
        >
          {categoriesObj[index].name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

