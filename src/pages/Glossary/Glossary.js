import React, { useRef, useState, useEffect } from 'react';
import { GStyle } from './GStyle';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { Image, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import GlossButtons from './GlossButtons';
import GlossaryBG from '../../assets/glossary/glossBg.png';
import GlossaryTitle from '../../assets/glossary/glossary.png';
import searchBg from '../../assets/glossary/searchBg.png';
import magnifying from '../../assets/glossary/magnifying.png';
import letterBG from '../../assets/glossary/letterBG.png';
import AppBackground from '../../components/AppBackground';
import { useNavigation } from '@react-navigation/native';
import XButton from "../../assets/generic/x.svg";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function Glossary() {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  // const [terms, setTerms] = useState([])
  const nav = useNavigation()

  const scrollViewRef = useRef(null);
  const sectionRefs = useRef(letters.map(() => React.createRef()));

  const [wordSearch, setWordSearch] = useState('');
  const [filteredWords, setFilteredWords] = useState([]);

  useEffect(() => {
    const newFilteredWords = terms.filter(item => item.word.toLowerCase().includes(wordSearch.toLowerCase()));
    setFilteredWords(newFilteredWords);
  }, [wordSearch]);

  
  const handleScrollToLetter = (index) => {
    const targetRef = sectionRefs.current[index]?.current;
    
    if (scrollViewRef.current && targetRef) {
      targetRef.measureLayout(scrollViewRef.current, (x, y) => {
        scrollViewRef.current.scrollTo({ y, animated: true });
      });
    }
  };
  const fetchTerms = async () => {
    const response = await axios.get(`${process.env.EXPO_PUBLIC_URL}/getTerms`)
    console.log("searched");
    return response.data;
  }
  const {isFetching, data: terms} = useQuery({queryKey: ['terms'], queryFn: fetchTerms, initialData: []})

  if (isFetching){
    return <AppBackground><Text>Loading. . .</Text></AppBackground>
  }

  return (
    <AppBackground >
      <Animated.View style={GStyle.header}>
        <Image source={GlossaryTitle} style={GStyle.headerImage} />
      </Animated.View>


      <Animated.View style={GStyle.subCont}>
        {/*------------------ SIDE BUTTON --------------------------*/}
        <View style={GStyle.btnCont}>
          {letters.map((elem, index) => (
            <GlossButtons key={index} letter={elem} id={index} onPress={() => handleScrollToLetter(index)} />
          ))}
        </View>
        {/*---------------------------------------------------------*/}

        <Animated.View style={GStyle.glossMainCont}>

          {/*------------------ SEARCH BAR --------------------------*/}
          <Animated.View style={GStyle.searchCont}>
            <Image source={searchBg} style={GStyle.searchBg} />
            <Image source={magnifying} />
            <TextInput
              style={GStyle.searchInput}
              placeholder="Search for a term"
              placeholderTextColor="white"
              onChangeText={setWordSearch}
              value={wordSearch}
            />
          </Animated.View>
          {/*---------------------------------------------------------*/}



          <Animated.View style={GStyle.glossSubCont}>
            <ScrollView ref={scrollViewRef}>
              {letters.map((letter, letterIndex) => {
                const letterWords = filteredWords.filter(item => item.word[0].toUpperCase() === letter);

                return (
                  <View key={letterIndex} ref={sectionRefs.current[letterIndex]}>
                    {wordSearch.length === 0 && (
                      <View style={GStyle.letterCont}>
                        <Image source={letterBG} style={GStyle.letterBg} />
                        <Text style={GStyle.letterStyle}>{letter}</Text>
                      </View>
                    )}

                    {letterWords.map((item, index) => (
                      <View key={index} style={GStyle.wordItem}>
                        <Text style={GStyle.wordStyle}>{item.word}</Text>
                        <Text style={GStyle.meaningStyle}>{item.meaning}</Text>
                      </View>
                    ))}
                  </View>
                );
              })}
            </ScrollView>
          </Animated.View>

        </Animated.View>
      </Animated.View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        <Animated.View
          entering={SlideInDown.delay(200)}
          exiting={SlideOutDown}
          style={[
            {
              marginHorizontal: "auto",
              backgroundColor: "#00000044",
              borderTopStartRadius: 24,
              borderTopEndRadius: 24,
              padding: 12,
              paddingBottom: 12,
              borderWidth: 2,
            },
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              nav.goBack();
            }}
          >
            <XButton width={42} height={42} />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </AppBackground>
  );
}
