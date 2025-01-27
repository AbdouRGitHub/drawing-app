import React from 'react';
import { View, Text, StyleSheet, TextInput } from "react-native";
import { styleSettings } from "../../styles/Global/Global";
import colors from "../../styles/Global/Colors";

interface ITextField {
  label: string;
  placeholder?: string;
  onChange?: (text: string) => void ;
  error?: boolean,
  secureField?: boolean,
}

const TextField = ({label, placeholder, onChange, error = false, secureField = false}: ITextField) => {

    let labelStyle = style.label;
    let inputStyle = style.input;

    if (error) {
      labelStyle = {...labelStyle, ...style.labelError};
      inputStyle = {...inputStyle, ...style.inputError};
    }
    return (
        <View style={style.container}>
            <Text style={labelStyle}>{ label }</Text>
            <TextInput
              style={inputStyle}
              placeholder={placeholder}
              autoCorrect={false}
              onChangeText={onChange}
              secureTextEntry={secureField}
            />
        </View>
    );
}

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10
  },
  label: {
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
    fontSize: 16
  },
  labelError: {
    color: colors.danger
  },
  input: {
    borderRadius: styleSettings.field.borderRadius,
    backgroundColor: '#fff',
    padding: styleSettings.field.padding
  },
  inputError: {
    borderWidth: 1,
    borderColor: colors.danger,
    color: colors.danger
  },
})

export { ITextField };
export default TextField;