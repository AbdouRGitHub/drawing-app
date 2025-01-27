import { useReducer, useState } from "react";
import { View, Button, Text } from "react-native";
import RegisterInput from "./RegisterInput";
import { defaultStyles } from "../../../styles/Global/Global";
import { signUp } from "../../../service/AuthService";

export default function RegisterForm(props: any) {
  const formState = {
    email: "",
    password: "",
  };
  const [errorText, setErrorText] = useState("");
  const [textValue, dispatch] = useReducer(registerReducer, formState);

  function registerReducer(state: any, action: any) {
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

  async function signUpHandler() {
    const response = await signUp(textValue.email, textValue.password);

    if (response.status == "ERROR") {
      errorTextHandler(response.data.error.message);
    } else if (response.status == "OK") {
      props.navigation.navigate("Login");
    }
  }

  return (
    <View style={defaultStyles.container}>
      <Text style={{ color: "red", textAlign: "center" }}>{errorText}</Text>
      <RegisterInput
        label="adresse mail"
        optionTextInput={{
          value: textValue.email,
          onChangeText: (textValue: string) => {
            dispatch({ type: "email", value: textValue });
          },
          maxLength: 30,
        }}
      />
      <RegisterInput
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
          title="soumettre"
          onPress={signUpHandler}
        />
      </View>
    </View>
  );
}
