import React, { ReactNode } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { defaultStyles, styleSettings } from "../../styles/Global/Global";

interface IButton {
  children: string,
  onPress: () => {}
}

const Button = ({children, onPress}: IButton) => {
    return (
        <TouchableOpacity style={style.container} onPress={onPress}>
          <LinearGradient colors={['#b47600', '#ec9e36']} style={defaultStyles.bgGradient}/>
          <Text style={style.text}>{ children }</Text>
        </TouchableOpacity>
    );
}

const style = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
    padding: styleSettings.field.padding,
    borderRadius: styleSettings.field.borderRadius,
    backgroundColor: 'yellow',
    overflow: 'hidden'
  },
  text: {
    color: '#fff',
    textAlign: 'center'
  }
})

export { IButton };
export default Button;