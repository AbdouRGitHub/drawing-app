import axios from "axios";
import { firebaseConfig } from "../firebase/config";
export async function signUp(email: string, password: string) {
  console.log(firebaseConfig.apiKey);
  return await axios.post(
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + firebaseConfig.apiKey,
    {
      email: email,
      password: password,
      returnSecureToken: true,

    }).then((response) => {
      return { status: 'OK', data: response.data };
    }).catch((error) => {
      return { status: 'ERROR', data: error.response.data };
    });
}

export async function signIn(email: string, password: string) {
  console.log(firebaseConfig.apiKey);
  return await axios.post(
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + firebaseConfig.apiKey,
    {
      email: email,
      password: password,
      returnSecureToken: true
    }
  ).then((response) => {
    return { status: 'OK', data: response.data };
  }).catch((error) => {
    return { status: 'ERROR', data: error.response.data };
  });
}

export async function userInfo(idToken: string) {
  return await axios.post(
    'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=' + firebaseConfig.apiKey,
    {
      idToken: idToken,
    }
  ).then((response) => {
    return response.data;
  });
}

export function editFirebaseErrorMessage(firebaseErrorMessage: string) {
  switch (firebaseErrorMessage) {
    case 'INVALID_LOGIN_CREDENTIALS':
      return 'Mail ou mot de passe incorrect';
      break;
    case 'MISSING_PASSWORD':
      return 'Mot de passe obligatoire';
      break;
    case 'INVALID_EMAIL':
      return 'Adresse mail non valide';
      break;
    default:
      return "Une erreur s'est produite";
  }
}