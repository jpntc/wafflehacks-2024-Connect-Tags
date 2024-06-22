import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Stack = createNativeStackNavigator();

const LogInNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LogIn"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="LogIn"
          component={SignIn}
        />
        <Stack.Screen name="Register" component={SignUp}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LogInNavigator;
