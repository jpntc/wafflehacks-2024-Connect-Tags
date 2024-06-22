import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const SignIn = () => {
  const route = useRoute();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("HomeScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Banner}>
        <Text style={styles.AppName}>Fast Connect</Text>
        <Text style={styles.motto}>Make Connections Faster</Text>
      </View>
      <Image source={require("../assets/login.jpg")} style={styles.logo} />
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
      <View style={styles.signupContainer}>
        <Text style={styles.orText}>Or</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.signupText}> Sign Up</Text>
        </TouchableOpacity>
      </View>
      <Button title="LogIn" onPress={handlePress} color="#1E90FF" />
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
  Banner: {
    alignItems: "center",
    marginBottom: 60,
  },
  AppName: {
    fontWeight: "bold",
    fontSize: 38,
    color: "#1f90ed",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  motto: {
    fontWeight: "bold",
    fontSize: 18,

    color: "#1E90FF",
  },
  signupContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  orText: {
    fontSize: 16,
  },
  signupText: {
    fontSize: 16,
    color: "#1E90FF",
    marginLeft: 1,
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
