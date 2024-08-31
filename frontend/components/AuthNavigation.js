import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";
import HomeScreen from "./HomeScreen";
import AppNavigation from "./AppNavigation"
const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LogIn"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="LogIn" component={SignInScreen}/>
        <Stack.Screen name="Register" component={SignUpScreen} />
        <Stack.Screen name="App" component={AppNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigation;
