import { initializeApp } from "firebase/app";
import { API_KEY, DATABASE_URL } from  "@env";
import firebase from "firebase/compat";

let nbFirebaseConfig = firebase.apps.length;
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  databaseURL: process.env.EXPO_PUBLIC_DATABASE_URL
};
const app = initializeApp(firebaseConfig);

export { app, firebaseConfig };