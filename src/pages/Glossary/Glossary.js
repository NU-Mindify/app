import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FlatList, Image, Text, TextInput, View } from 'react-native';
import api from '../../api';
import GlossaryTitle from '../../assets/glossary/glossary.png';
import magnifying from '../../assets/glossary/magnifying.png';
import searchBg from '../../assets/glossary/searchBg.png';
import AppBackground from '../../components/AppBackground';
import LoadingOverlay from '../../components/LoadingOverlay';
import { API_URL } from '../../constants';
import ModalContext from '../../contexts/ModalContext';
import { getData, storeData } from '../../hooks/useFirebase';
import { GStyle } from './GStyle';
import GlossButtons from './GlossButtons';

export default function Glossary() {
  const {setToast} = useContext(ModalContext)
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  const [terms, setTerms] = useState([])

  const scrollViewRef = useRef(null);
  const sectionRefs = useRef(letters.map(() => React.createRef()));
  const [isFetching, setIsFetching] = useState(true)

  const [wordSearch, setWordSearch] = useState('');
  const [filteredWords, setFilteredWords] = useState([]);

  useEffect(() => {
    setIsFetching(true)

    const lower = wordSearch.toLowerCase();
    const startsWith = terms.filter((t) =>
      t.word.toLowerCase().startsWith(lower)
    );
    const contains = terms.filter(
      (t) =>
        !t.word.toLowerCase().startsWith(lower) &&
        t.word.toLowerCase().includes(lower)
    );

    setFilteredWords([...startsWith, ...contains]);

    // const newFilteredWords = terms.filter(item => item.word.toLowerCase().includes(wordSearch.toLowerCase()));
    // setFilteredWords(newFilteredWords);
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
      console.log(response.data.length);
      
      setTerms(response.data)
      setWordSearch('')
      
      storeData("terms", response.data)
    } catch (error) {
      setToast(error.message)
    }
    setIsFetching(false)
  }
  const prepareTerms = async () => {
    setIsFetching(true);
    try {
      const {data: cloudLatestTerm} = await axios.get(API_URL + "/getLatestUpdatedTerm")
      const savedLatestTerm = await getData("latest_term")
      console.log("Comparing Term update:", cloudLatestTerm, savedLatestTerm);
      console.log("Comparing RESULT:", cloudLatestTerm.updatedAt > savedLatestTerm?.updatedAt);
      
      if(!savedLatestTerm || cloudLatestTerm.updatedAt > savedLatestTerm.updatedAt){
        await fetchTerms();
        await storeData("latest_term", cloudLatestTerm)
      }else{
        const storageTerms = await getData("terms");
        setTerms(storageTerms)
      }
    } catch (error) {
      console.error(error);
    }
    setIsFetching(false);
  }
  useEffect(() => {
    prepareTerms();
    return () => setTerms([])
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
            <GlossButtons key={index} letter={elem} id={index} onPress={() => setWordSearch(elem)} />
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
            <Text style={{fontSize:12}}>{filteredWords.length} terms found</Text>
            <FlatList 
              data={filteredWords} 
            renderItem={({ item }) => (
              <View style={{ padding: 8 }}>
                <Text style={{ fontWeight: "bold" }}>{item.word}</Text>
                <Text>{item.meaning}</Text>
              </View>
            )} ref={scrollViewRef}>
              {/* {filteredWords.length === 0 && wordSearch.length >0 ? (
                <View style={{ padding:20, alignItems: 'center'}}>
                  <Text style = {{color:"black", fontSize:15}}>No terms to show.</Text>
                </View>
              ) : (
                letters.map((letter, letterIndex) => {
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
              })
              )} */}
            </FlatList>

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
