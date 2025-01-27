import { useReducer, useState } from "react";
import { View, Button, Text } from "react-native";
import LoginInput from "./LoginInput";
import { defaultStyles } from "../../../styles/Global/Global";
import { signIn } from "../../../service/AuthService";
import * as SecureStore from 'expo-secure-store';

export default function LoginForm(props : any) {
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
    } else if (response.status == "OK") {
      await SecureStore.setItemAsync('token', response.data.idToken);
      props.navigation.navigate("Room");
    }
  }

  return (
    <View style={defaultStyles.container}>
      <Text style={{ color: "red", textAlign: "center" }}>{errorText}</Text>
      <LoginInput
        label="adresse mail"
        optionTextInput={{
          value: textValue.email,
          onChangeText: (textValue: string) => {
            dispatch({ type: "email", value: textValue });
          },
          maxLength: 30,
        }}
      />
      <LoginInput
        label="mot de passe"
        optionTextInput={{
          secureTextEntry: true,
          value: textValue.password,
          onChangeText: (textValue: string) => {
            dispatch({ type: "password", value: textValue });
          },
        }}
      />
      <View>
      <Button
          title="connexion"
          onPress={signInHandler}
        />
        <Button
          title="s'inscrire ?"
          onPress={() => {
            props.navigation.navigate("Register");
          }}
        />
      </View>
    </View>
  );
}
