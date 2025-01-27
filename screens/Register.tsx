import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
  Text,
  TouchableOpacity,
  Image, ScrollView, StyleSheet
} from "react-native";
import RegisterForm from "../components/Form/Register/RegisterForm";
import { defaultStyles } from "../styles/Global/Global";
import { LinearGradient } from "expo-linear-gradient";
import Parameters from "../components/Parameters";
import Alert from "../components/Alert";
import TextField from "../components/Form/TextField";
import { useReducer, useState } from "react";
import { signUp } from "../service/AuthService";
import Button from "../components/Form/Button";

export default function Register({ navigation }: any) {

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
      navigation.navigate("Login");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={defaultStyles.body} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={{...defaultStyles.container, ...style.container}}>
          <LinearGradient colors={['#3951c9', '#0e2393', '#391072', '#16022a']} style={defaultStyles.bgGradient}/>
          <Parameters/>
          <View style={style.form}>
            <Text style={style.title}>Inscription</Text>
            <Text style={style.description}>Prépare-toi pour une aventure artistique ! Rejoins-nous avec tes amis et découvrons ensemble qui a le coup de crayon le plus magique 🎨✨</Text>
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
            <Button onPress={signUpHandler}>S'inscrire</Button>
            <Text style={defaultStyles.link} onPress={() => navigation.navigate('Login')}>Se connecter ?</Text>
          </View>
          <ScrollView>
            <View style={{alignItems: 'center', position: 'relative'}}>
              <Image
                source={require('../assets/img/friendship.png')}
                style={{resizeMode:'cover', width: 400, height: 250, position: 'absolute', top:75}}
              />
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const style = StyleSheet.create({
  container: {
    position:'relative',
    justifyContent: 'space-between',
    paddingVertical: 80
  },
  form: {
    display: 'flex',
    gap: 25,
    paddingHorizontal: 20
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20
  },
  description: {
    color: '#fff',
    letterSpacing: 1,
    lineHeight: 30
  }
})