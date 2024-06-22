import React, { useState } from "react";
import { View, SafeAreaView, Text, TextInput, Button, StyleSheet, Image } from "react-native";

const SignIn = ({ type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlePress = () => {
    console.log(`${type} with`, { email, password });
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.AppName}>Fast Connect</Text>
        <Image source={require("../assets/login.jpg")} style={styles.logo} />
        <Text style={styles.title}>
          {type === "login" ? "Login" : "Sign Up"}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Text style={styles.signup}>Or sign up</Text>
        <Button
          title={type === "login" ? "Login" : "Sign Up"}
          onPress={handlePress}
          color="#1E90FF"
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  AppName: {
    fontWeight: "bold",
    fontSize: 38,
    marginBottom: 20,
    color: "orange",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 20,
    color: "#1E90FF",
  },
  signup: {
    color: "#b8b8b8",
  },
  input: {
    maxWidth: "40%",
    minWidth: "40%",
    height: 40,
    borderColor: "#1E90FF",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: "black",
  },
});

export default SignIn;
