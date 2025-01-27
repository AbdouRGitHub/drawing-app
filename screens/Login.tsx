import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Image, ScrollView
} from "react-native";
import { useReducer, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { LinearGradient } from "expo-linear-gradient";

import { defaultStyles } from "../styles/Global/Global";
import TextField from "../components/Form/TextField";
import Button from "../components/Form/Button";
import { signIn } from "../service/AuthService";
import Parameters from "../components/Parameters";
import Alert from "../components/Alert";

export default function Login({ navigation }: any) {

  const formState = {
    email: "",
    password: "",
  };
  const [errorText, setErrorText] = useState("");
  const [textValue, dispatch] = useReducer(loginReducer, formState);

  function loginReducer(state: any, action: any) {
    switch (action.type) {
      case "email": {
        return {
          ...state,
          email: action.value,
        };
      }
      case "password": {
        return {
          ...state,
          password: action.value,
        };
      }
      default:
        return state;
    }
  }

  function errorTextHandler(text: string) {
    setErrorText(text);
  }

  async function signInHandler() {
    const response = await signIn(textValue.email, textValue.password);

    if (response.status == "ERROR") {
      errorTextHandler(response.data.error.message);
      if (response.data.error.message === 'INVALID_LOGIN_CREDENTIALS') {
      }
    } else if (response.status == "OK") {
      await SecureStore.setItemAsync('token', response.data.idToken);
      navigation.navigate("Room");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={defaultStyles.body} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={{...defaultStyles.container, ...style.container}}>
          <LinearGradient colors={['#3951c9', '#0e2393', '#391072', '#16022a']} style={defaultStyles.bgGradient}/>
          <ScrollView>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../assets/img/logo.png')}
                style={{resizeMode:'cover', width: 250, height: 250}}
              />
            </View>
          </ScrollView>
          <Parameters/>
          <View style={style.form}>
            { errorText.length > 0 && <Alert>{errorText}</Alert>}
            <TextField
              label={'Adresse email'}
              placeholder={'Adresse email'}
              onChange={(email: string) => dispatch({type: 'email', value: email})}
              error={errorText.length > 0}
            />
            <TextField
              label={'Mot de passe'}
              placeholder={'Mot de passe'}
              onChange={(password: string) => dispatch({type: 'password', value: password})}
              error={errorText.length > 0}
              secureField={true}
            />
            <Button onPress={signInHandler}>Se connecter</Button>
            <Text style={defaultStyles.link} onPress={() => navigation.navigate('Register')}>S'inscrire ?</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const style = StyleSheet.create({
  container: {
    position:'relative',
    justifyContent: 'space-between',
    paddingVertical: 75
  },
  form: {
    display: 'flex',
    gap: 25,
    paddingHorizontal: 20
  }
});
