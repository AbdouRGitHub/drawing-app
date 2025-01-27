import React, { ReactNode } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { styleSettings } from "../styles/Global/Global";
import colors from "../styles/Global/Colors";
import { editFirebaseErrorMessage } from "../service/AuthService";

interface IAlert {
  children: string
}

const Alert = ({children}: IAlert) => {
    return (
        <View style={style.container}>
          <Text style={style.text}>{editFirebaseErrorMessage(children)}</Text>
        </View>
    );
}

const style = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    borderRadius: styleSettings.field.borderRadius,
    backgroundColor: colors.danger
  },
  text: {
    textAlign: 'center',
    color: '#541f1f',
    fontWeight: '600',
    textTransform: 'uppercase',
  }
})

export { IAlert };
export default Alert;