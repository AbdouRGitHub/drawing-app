import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Board from "./screens/Board";
import SoundProvider, { SoundContext } from "./context/SoundContext";
import { useContext, useEffect, useState } from "react";
import { Sound } from "expo-av/build/Audio/Sound";
import { Audio } from "expo-av";
import Room from "./screens/Room";

const headerOptions = {
  headerTintColor: "#8163EA",
  headerStyle: {
    backgroundColor: "#323232",
    borderBottomWidth: 0,
  },
  headerShown: false
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SoundProvider>
      <NavigationContainer>
          <Stack.Navigator initialRouteName={'Login'}>
              <Stack.Screen
                  name="Login"
                  component={Login}
                  options={headerOptions}
                />
              <Stack.Screen
                name="Room"
                component={Room}
                options={headerOptions}
              />
              <Stack.Screen
                  name="Board"
                  component={Board}
                  options={headerOptions}
              />
                <Stack.Screen
                  name="Register"
                  component={Register}
                  options={headerOptions}
                />
          </Stack.Navigator>
      </NavigationContainer>
    </SoundProvider>
  );
}

