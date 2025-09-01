import { View, TextInput, Text, Pressable } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react-native';

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
  errorText,
  label
}) => {
    const input = useRef(null);
    useEffect(() => {
      currentFocus && input.current?.focus();
    }, [currentFocus])
    const [isValid, setIsValid] = useState(true);
    const [isValueHidden, setIsValueHidden] = useState(secure)
  return (
    <View style={[{ width: "100%", marginHorizontal: "auto" }, style]}>
      {label && (
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontFamily: "LilitaOne-Regular",
          }}
        >
          {label}:<Text style={{ color: "#ff2121" }}>*</Text>
        </Text>
      )}
      <View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: disabled ? "#c4c4c4" : "white",
            width: "100%",
            marginHorizontal: "auto",
            padding: 8,
            paddingVertical: 4,
            borderRadius: 12,
            gap: 12,
            borderWidth: 2,
          },
          !isValid
            ? {
                borderWidth: 2,
                borderColor: "red",
                boxShadow: "0px 0px 12px red",
              }
            : { marginBottom: 2 },
        ]}
      >
        {Icon && <Icon color="black" />}
        <TextInput
          placeholder={placeholder}
          onChangeText={(text) => {
            setIsValid(condition(text));
            onChangeText(text);
          }}
          value={value}
          secureTextEntry={isValueHidden}
          disabled={disabled}
          editable={!disabled}
          selectTextOnFocus={disabled}
          style={[{ flex: 1, color:'black' }, inputStyle]}
          keyboardType={keyboardType}
          textContentType={textContentType}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          multiline={multiline}
          numberOfLines={numberOfLines}
          rows={rows}
          textAlignVertical="top"
          ref={input}
        />
        {children}
        {secure &&
        <Pressable onPress={() => setIsValueHidden(!isValueHidden)}> 
          {isValueHidden ? 
          <Eye color={"black"} /> 
        :
        <EyeOff color={"black"} />
        }
        </Pressable>
        }
      </View>
      {!isValid && (
        <Text style={{ color: "#ff3636", fontWeight: 700 }}>{errorText}</Text>
      )}
    </View>
  );
};

export default Input