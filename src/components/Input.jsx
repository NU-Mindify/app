import { View, TextInput, Text } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

const Input = ({
  children,
  placeholder,
  Icon,
  onChangeText,
  value,
  secure = false,
  disabled = false,
  style = {},
  inputStyle = {},
  textContentType = "none",
  keyboardType = "default",
  returnKeyType = "default",
  currentFocus = false,
  onSubmitEditing = () => {},
  multiline= false,
  numberOfLines=1,
  rows=1,
  condition = () => true,
  errorText
}) => {
    const input = useRef(null);
    useEffect(() => {
      currentFocus && input.current?.focus();
    }, [currentFocus])
    const [isValid, setIsValid] = useState(true);
  return (
    <>
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: disabled ? "#c4c4c4" : "white",
          width: "100%",
          marginHorizontal: "auto",
          padding: 2,
          paddingHorizontal: 8,
          borderRadius: 24,
          gap: 12,
        },
        style,
        !isValid ? {borderWidth:2, borderColor:'red', boxShadow: "0px 0px 12px red"} : {marginBottom: 2}
      ]}
    >
      {Icon && <Icon color="black" />}
      <TextInput
        placeholder={placeholder}
        onChangeText={text => {
          setIsValid(condition(text))
          onChangeText(text)
        }}
        value={value}
        secureTextEntry={secure}
        disabled={disabled}
        editable={!disabled}
        selectTextOnFocus={disabled}
        style={[{ flex: 1 }, inputStyle]}
        keyboardType={keyboardType}
        textContentType={textContentType}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        multiline={multiline}
        numberOfLines={numberOfLines}
        rows={rows}
        textAlignVertical='top'
        ref={input}
      />
      {children}
    </View>
    {!isValid && 
    <Text style={{color: '#ff3636', fontWeight:700 }}>{errorText}</Text>
    }
    </ >
  );
};

export default Input