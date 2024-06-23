import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Modal,
  TextInput,
} from "react-native";

const Home = ({ User }) => {
  const [showModal, setShowModal] = useState(false);
  const [rawDescription, setRawDescription] = useState("");
  const [generatedInfo, setGeneratedInfo] = useState("");

  const getNewInfo = async () => {
    try {
      const endpoint = "https://api.example.com/generateCard"; // Replace with your API endpoint
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: rawDescription }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setGeneratedInfo(data);
    } catch (error) {
      console.error("Error fetching custom info:", error);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.banner}>
        <Image source={require("../assets/login.jpg")} style={styles.logo} />
        <View style={styles.welcomeView}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.welcomeText}>FastConnectSquad</Text>
        </View>
      </SafeAreaView>
      <View style={styles.paneContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleModal}>
            <Text style={styles.buttonText}>Customize Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Print Card</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.pane}>
          <View style={styles.top}>
            <View style={styles.necklace}></View>
            <Text style={styles.description}>User Description Here</Text>
            <View style={styles.userProfile}>
              <Image
                source={require("../assets/login3.jpg")}
                style={styles.pfp}
              />
              <Text style={styles.userName}>User Name</Text>
            </View>
          </View>
          <View style={styles.userBanner}>
            <Image
              source={require("../assets/banner.jpg")}
              style={styles.userBannerImage}
            />
          </View>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>
              Enter a description of yourself, like your favorite games, and
              shows, and our AI will generate a customized card for you.
            </Text>
            <TextInput
              style={styles.input}
              value={rawDescription}
              onChangeText={setRawDescription}
              multiline={true}
            />
          </View>
          <TouchableOpacity style={styles.getCard} onPress={getNewInfo}>
            <Text style={styles.getCardText}>Generate</Text>
          </TouchableOpacity>
          {generatedInfo ? (
            <>
              <View style={styles.generatedImage}>
                <Image
                  source={{ uri: generatedInfo.ImageURL }}
                  style={styles.pfp}
                />
              </View>
              <View>
                <Text>{generatedInfo.description}</Text>
              </View>
            </>
          ) : null}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e3e6e8",
  },
  banner: {
    backgroundColor: "#484948",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 40,
    paddingBottom: 30,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  welcomeView: {
    flex: 1,
    backgroundColor: "white",
    marginLeft: 20,
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    borderRadius: 50,
  },
  paneContainer: {
    flex: 1,
    flexDirection: "column",
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  pane: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#E48383",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    width: "100%",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  top: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "orange",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 16,
    textAlign: "center",
  },
  necklace: {
    top: 10,
    width: 50,
    height: 50,
    backgroundColor: "black",
    borderRadius: 50,
  },
  userProfile: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10,
  },
  pfp: {
    position: "relative",
    top: 70,
    zIndex: -10,
    width: 170,
    height: 170,
    borderRadius: 100,
  },
  userName: {
    position: "relative",
    top: 35,
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
  },
  userBanner: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  description: {
    margin: 20,
    padding: 10,
    textAlign: "center",
    width: "100%",
    fontSize: 16,
    color: "black",
  },
  userBannerImage: {
    zIndex: -10,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    opacity: 0.9,
  },
  inputContainer: {
    borderRadius: 10,
    backgroundColor: "grey",
    width: "100%",
    marginBottom: 10,
    padding: 10,
    color: "white",
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: "white",
  },
  input: {
    fontSize: 16,
    color: "white",
    height: 80,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  getCard: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  getCardText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});

export default Home;
