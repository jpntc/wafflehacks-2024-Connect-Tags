import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import SignIn from "./components/SignIn";

export default function App() {
  console.log("hey jude");
  return (
    <SafeAreaView style={styles.container}>
    <SignIn type="login" />
    <StatusBar style="auto"/>
    </SafeAreaView>
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
