import { Dimensions, StyleSheet } from "react-native";
import Constants from "expo-constants";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const marginLeft = -(screenWidth/14)

const blueWidth = screenWidth - 20
const blueHeight = (screenHeight/2) * 1.6

const glossMainWidth = blueWidth - 45
const glossMainHeight = blueHeight - 30


export const GStyle = StyleSheet.create({

    header:{
        marginTop:32
    },

    headerImage:{
    },

    subCont:{
        width: blueWidth,
        height: blueHeight,
        backgroundColor: '#35408E',
        borderRadius: 25,
        marginLeft: marginLeft +10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: blueWidth/15
    },

    glossMainCont:{
        width: glossMainWidth,
        height: glossMainHeight,
        backgroundColor: '#F9EBDE',
        borderRadius: 20,
        alignItems: 'center',
        position: 'absolute'
    },

    glossSubCont:{
        width: glossMainWidth - 30,
        height: (glossMainHeight / 2) * 1.75,
        backgroundColor: '#FBF0EE',
        paddingLeft: 10,
        paddingTop: 10,
        borderRadius: 15,
        marginTop: 5,
    },

    scrollStyle:{
        width: glossMainWidth - 30,
        height: (glossMainHeight / 2) * 1.7,

    },

    btnCont:{
        width: glossMainWidth/6,
        height: glossMainHeight,
        alignSelf: 'flex-end',
        marginRight: -25
    },

    btnStyle: {
        width: glossMainWidth / 6,
        height: glossMainHeight / 34,
        backgroundColor: '#001E4D',
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    
    imageBtn:{
        width: '100%',
        resizeMode: 'contain',
        position: 'absolute'
    },

    btnTxt:{
        fontSize: 10,
        color: 'white',
        // textAlign: 'center',
        // textAlignVertical: 'center',
    },


    letterCont:{
        width: glossMainWidth/4,
        height: glossMainWidth/4,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -10,
        marginLeft: -10
    },

    letterBg:{
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        position: 'absolute'
    },

    letterStyle:{
        fontSize: 25,
        color: 'white'
    },

    wordItem:{
        width: '95%',
        height: 'auto',
    },

    wordStyle:{
        fontSize: 20,
        color: '#273574'
    },

    meaningStyle:{
        fontSize: 15,
        color: 'black',
        textAlign: 'justify',
        marginBottom: 10
    },

    searchCont:{
        width: glossMainWidth - 10,
        height: glossMainHeight/10,
        top: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },

    searchBg:{
        width: '100%',
        height:'100%',
        position: 'absolute'
    },
    searchInput:{
        width: '70%', 
        height: '70%',
        fontSize: 12,
        padding: 0,
        borderWidth: 0,
        color: 'white',
        paddingLeft: 10,
    },
})