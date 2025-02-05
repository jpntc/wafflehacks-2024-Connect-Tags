import React, { useState, useEffect } from "react";
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
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const SignIn = () => {
  const route = useRoute();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user)
      {
        console.log("User is still signed in (it worked):", user.uid);
        navigation.navigate("HomeScreen", { user });
      }
      else
      {
        console.log("No user is currently signed in, navigating to Login page/screen");
        navigation.navigate("LogIn");
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  const handlePress = () => {
    // If the email and password is not empty, sign in with existing email and password and redirect user to home screen
    if (email !== "" && password !== "")
    {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigation.navigate("HomeScreen", { user: userCredential.user });
        setEmail(""); // Clear email input field
        setPassword(""); // Clear password input field
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error during sign in:", errorCode, errorMessage);
      });
    }
    else 
    {
      console.log("Please enter an email and password");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Banner}>
        <Image source={require("../assets/login.jpg")} style={styles.logo} />
        <Text style={styles.AppName}>Fast Connect</Text>
        <Text style={styles.motto}>Make Friends Faster</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.loginText}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="johndoe1@gmail.com"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.form}>
        <Text style={styles.loginText}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="******"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.signupContainer}>
        <Text style={styles.orText}>Or</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.signupText}> Sign Up</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 40,
    backgroundColor: "#e3e6e8",
  },
  Banner: {
    marginBottom: 50,
    alignItems: "center",
  },
  AppName: {
    fontWeight: "bold",
    fontSize: 38,
    color: "black",
  },
  logo: {
    width: 170,
    height: 170,
    marginBottom: 20,
    borderRadius: 70,
  },
  motto: {
    fontWeight: "bold",
    fontSize: 18,
    color: "black",
  },
  form: {
    flexDirection: "row",
    fontSize: 16,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    color: "black",
  },
  loginButton: {
    minWidth: 200,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "black",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  orText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginLeft: 1,
  },
  signupText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#61605c",
    marginLeft: 1,
  },
  loginText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    margin: 2,
    fontSize: 16,
    maxWidth: 80,
    minWidth: 80,
  },
  input: {
    maxWidth: "50%",
    minWidth: "50%",
    marginLeft: 2,
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: "black",
  },
});

export default SignIn;
