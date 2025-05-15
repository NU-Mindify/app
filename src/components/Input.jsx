import { View, TextInput } from 'react-native'
import React, { useEffect, useRef } from 'react'

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
  currentFocus,
  onSubmitEditing = () => {},
}) => {
    const input = useRef(null);
    useEffect(() => {
      currentFocus && input.current?.focus();
    }, [currentFocus])

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: disabled ? "#c4c4c4" : "white",
          width: "100%",
          marginHorizontal: "auto",
          padding: 8,
          borderRadius: 24,
          gap: 12,
          marginBottom: 6,
        },
        style,
      ]}
    >
      {Icon && <Icon color="black" />}
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={secure}
        disabled={disabled}
        editable={!disabled}
        selectTextOnFocus={!disabled}
        style={[{ flex: 1 }, inputStyle]}
        keyboardType={keyboardType}
        textContentType={textContentType}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        ref={input}
      ></TextInput>
      {children}
    </View>
  );
};

export default Input