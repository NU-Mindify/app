import React, { useRef, useState, useEffect } from 'react';
import { GStyle } from './GStyle';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { Image, ImageBackground, ScrollView, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import GlossButtons from './GlossButtons';
import GlossaryBG from '../../assets/glossary/glossBg.png';
import GlossaryTitle from '../../assets/glossary/glossary.png';
import searchBg from '../../assets/glossary/searchBg.png';
import magnifying from '../../assets/glossary/magnifying.png';
import letterBG from '../../assets/glossary/letterBG.png';
import AppBackground from '../../components/AppBackground';
import { useNavigation } from '@react-navigation/native';
import XButton from "../../assets/generic/X-White.svg";
import axios from 'axios';
import { API_URL } from '../../constants';
import api from '../../api';
import LoadingOverlay from '../../components/LoadingOverlay';

export default function Glossary() {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  const [terms, setTerms] = useState([])
  const nav = useNavigation()

  const scrollViewRef = useRef(null);
  const sectionRefs = useRef(letters.map(() => React.createRef()));
  const [isFetching, setIsFetching] = useState(true)

  const [wordSearch, setWordSearch] = useState('');
  const [filteredWords, setFilteredWords] = useState([]);

  useEffect(() => {
    setIsFetching(true)
    const newFilteredWords = terms.filter(item => item.word.toLowerCase().includes(wordSearch.toLowerCase()));
    setFilteredWords(newFilteredWords);
    setIsFetching(false)
  }, [wordSearch, terms]);

  
  const handleScrollToLetter = (index) => {
    const targetRef = sectionRefs.current[index]?.current;
    
    if (scrollViewRef.current && targetRef) {
      targetRef.measureLayout(scrollViewRef.current, (x, y) => {
        scrollViewRef.current.scrollTo({ y, animated: true });
      });
    }
  };
  const fetchTerms = async () => {
    setIsFetching(true)
    try {
      const response = await api.get(`/getTerms`)
      setTerms(response.data)
      setWordSearch('')
      
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.LONG)
    }
    setIsFetching(false)
  }
  useEffect(() => {
    fetchTerms();
  }, [])
  return (
    <AppBackground >
      {isFetching &&
       <LoadingOverlay text={"Loading..."} />
      }
      <View style={[GStyle.header, {justifyContent:'center', alignItems:'center', flexDirection:'row', position:'relative'}]}>
        <Image source={GlossaryTitle} style={GStyle.headerImage} />
        {/* <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            nav.goBack();
          }}
          style={{
            position:'absolute',
            right:30,
            top:'26%'
          }}
        >
          <XButton width={30} height={30} />
        </TouchableOpacity> */}
      </View>


      <View style={GStyle.subCont}>
        {/*------------------ SIDE BUTTON --------------------------*/}
        <View style={GStyle.btnCont}>
          {letters.map((elem, index) => (
            <GlossButtons key={index} letter={elem} id={index} onPress={() => handleScrollToLetter(index)} />
          ))}
        </View>
        {/*---------------------------------------------------------*/}

        <View style={GStyle.glossMainCont}>

          {/*------------------ SEARCH BAR --------------------------*/}
          <View style={GStyle.searchCont}>
            <Image source={searchBg} style={GStyle.searchBg} />
            <Image source={magnifying} />
            <TextInput
              style={GStyle.searchInput}
              placeholder="Search for a term"
              placeholderTextColor="white"
              onChangeText={setWordSearch}
              value={wordSearch}
            />
          </View>
          {/*---------------------------------------------------------*/}



          <View style={GStyle.glossSubCont}>
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
          </View>

        </View>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
      </View>
    </AppBackground>
  );
}
