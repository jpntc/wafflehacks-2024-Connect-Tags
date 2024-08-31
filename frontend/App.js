import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./components/AuthNavigation";

export default function App() {

  return (
        <AuthNavigation authenticateHook={setIsAuthenticated} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
