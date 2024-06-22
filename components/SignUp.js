// SignUpScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";

const SignUpScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleSignUp = () => {
    const user_info = { firstName, lastName, birthday, email, password };
    console.log(user_info);
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require("../assets/signup3.jpg")} style={styles.logo} />
      </ScrollView>
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholder="Birthday (YYYY-MM-DD)"
          value={birthday}
          onChangeText={setBirthday}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Sign Up" onPress={handleSignUp} color="#1E90FF" />
        <TouchableOpacity
          style={styles.backArrowContainer}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={30} color="#1E90FF" />
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1E90FF",
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#1E90FF",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  backArrowContainer: {
    position: "absolute",
    bottom: 20,
    alignItems: "center",
  },
});

export default SignUpScreen;
