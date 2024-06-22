import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const SignIn = () => {
  const route = useRoute();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handlePress = () => {
    console.log( { email, password });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.AppName}>Fast Connect</Text>
      <Image source={require("../assets/login.jpg")} style={styles.logo} />
      <Text style={styles.title}>Login</Text>
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
      <TouchableOpacity >
        <Text style={styles.signup} onPress={() => navigation.navigate("Register")}>Sign up</Text>
      </TouchableOpacity>
      <Button
        title="LogIn"
        onPress={handlePress}
        color="#1E90FF"
      />
    </SafeAreaView>
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
    color: "#1f90ed",
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
    color: "#1E90FF",
    marginBottom: 20,
  },
  input: {
    maxWidth: "80%",
    minWidth: "80%",
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
