import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import AppBackground from '../../components/AppBackground';
import styles from '../../styles/styles';

const TermsAndConditions = () => {
  const nav = useNavigation()
  return (
    <AppBackground>
      <View style={{ flex: 1, margin: 16, borderRadius: 24, overflow:'hidden' }}>
        <WebView
          source={{ uri: "https://nu-mindify.vercel.app/terms-and-conditions" }}
        />
      </View>
      <View>
        <TouchableOpacity onPress={() => nav.goBack()} style={[styles.button, {width:'60%', margin:'auto', marginBottom: 24}]}>
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
    </AppBackground>
  );
}

export default TermsAndConditions