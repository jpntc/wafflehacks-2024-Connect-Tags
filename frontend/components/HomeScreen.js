import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  ImageBackground
} from "react-native";
import CardPane from "./CardPane"


const test={
     cardBackgroundColor:"orange",
     textColor: "#000000",
     nameFontSize: 24,
     nameFontStyle:"Serif",
     nameFontWeight:"bold",
     nameFontColor:"green",
     borderRadius: 8,
     holeColor:"black",
     holeRadius:20,
     descriptionBackgroundColor:"black",
     descriptionFontSize:20,
     descriptionFontWeight:"normal",
     descriptionTextColor:"black", 
     descriptionBackgroundColor:"grey",
   }
  const data = {
    userName: "Jude",
    userAvatar:
      "https://th.bing.com/th/id/OIP.f4aL6WXIvkrJoawAxDBb7AAAAA?rs=1&pid=ImgDetMain",
    userBanner: "https://wallpapercave.com/wp/wp2860340.jpg",
    userDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in",
  };
const HomeScreen = ({ User }) => {
  const [showModal, setShowModal] = useState(false);
  const [generatedInfo, setGeneratedInfo] = useState({});
  const [wholeCard, setWholeCard] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(null)
  const [cardInfo, setCardInfo] = useState({})
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

  const printCard = async ()=>{
    console.log("printing")
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/background.jpg")}
        style={styles.background}
      >
        <View style={styles.banner}>
          <View style={styles.brand}>
            <Text style={styles.brandText}>Connect Tags</Text>
          </View>
          <View style={styles.welcomeBanner}>
            <View style={styles.welcomeText}>
              <Text>Welcome</Text>
              <Text>"User.Name"</Text>
            </View>
            <TouchableOpacity onPress={() => setUserMenuOpen(!userMenuOpen)}>
              <Image
                source={require("../assets/login.jpg")}
                style={styles.avatar}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.homeBody}>
          <TouchableOpacity style={styles.printButton} onPress={printCard}>
            <Text style={styles.printButtonText}>Print Card</Text>
          </TouchableOpacity>
          <View style={styles.paneContainer}>
            <CardPane Data={data} customStyle={test}/>
          </View>
        </View>
        {userMenuOpen && <View style={styles.userMenu}></View>}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e3e6e8",
  },
  background: { flex: 1 },
  banner: {
    backgroundColor: "#484948",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  brand: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  brandText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  welcomeBanner: {
    flex: 0.8,
    display: "flex",
    flexDirection: "row",
  },
  welcomeText: {
    flex: 1,
    backgroundColor: "white",
    fontSize: 10,
    fontWeight: "bold",
    borderRadius: 10,
    padding: 8,
  },
  logo: {
    marginLeft: 5,
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  avatar: {
    marginLeft: 5,
    width: 60,
    height: 60,
    resizeMode: "contain",
    borderRadius: 50,
  },
  userMenu: {
    display: "flex",
    flexDirection: "column",
    padding: 2,
    borderRadius: 10,
  },

  homeBody: {
    flex: 1,
    marginTop: 30,
    paddingHorizontal: 4,
  },
  printButton: {
    backgroundColor: "#61605c",
    paddingHorizontal: 8,
    paddingVertical: 6,
    alignSelf: "flex-start",
    borderRadius: 5,
  },
  printButtonText: {
    fontSize: 18,
    color: "#c9f047",
    fontWeight: "bold",
    textAlign: "center",
  },
  paneContainer: {
    flex:1

  },
});

export default HomeScreen;
