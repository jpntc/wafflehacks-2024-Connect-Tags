import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import CardPane from "./CardPane";
const EditCard = (cardStyle, setCardStyle, userData, setUserData) => {

  const [Style, setStyle] = useState({});
  const [Data, setData] = useState({});
  const [cardBackgroundColor, setCardBackgroundColor] = useState("orange");
  const [descriptionTextColor, setDescriptionTextColor] = useState("black");
  const [descriptionBackgroundColor, setDescriptionBackgroundColor] = useState("grey");
  const [descriptionFontWeight, setDescriptionFontWeight] = useState("normal");
  const [descriptionFontSize, setDescriptionFontSize] = useState(20);
  const [nameBackgroundColor, setNameBackgroundColor] = useState("");
  const [nameFontSize, setNameFontSize] = useState(0);
  const [nameFontWeight, setNameFontWeight] = useState(0);
  const [nameTextColor, setNameTextColor] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [generatedDescription, setGeneratedDescription] = useState("");
  const [userBanner, setUserBanner] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  const printData = () => {
    setStyle({
      cardBackgroundColor: cardBackgroundColor,
      nameFontSize: nameFontSize,
      nameFontStyle: "Serif",
      nameFontWeight: nameFontWeight,
      nameTextColor: nameTextColor,
      nameBackgroundColor: nameBackgroundColor,
      borderRadius: 8,
      holeColor: "black",
      holeRadius: 20,
      descriptionFontSize: descriptionFontSize,
      descriptionFontWeight: descriptionFontWeight,
      descriptionTextColor: descriptionTextColor,
      descriptionBackgroundColor: descriptionBackgroundColor,
    });

    setData({
      userDescription: description,
      userBanner: userBanner,
      userAvatar: userAvatar,
      userName: name,
    });
    console.log(Style);
    console.log(Data);
  };

  const getDescription = async () => {
    if (description == "" || name == "") {
      alert("You didn't enter anything in the description or for your name");
      return;
    }

    // Replace 'localhost' with your computer's IP address.
    const endpoint = "http:192.168.1.109:3001/generate-image";

    try {
      const request = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });
      const response = await request.json();

      console.log("Made request");
      if (request.status === 200) {
        setGeneratedDescription(response.generatedDescription);
        setUserBanner(response.userBanner);
        setUserAvatar(response.userAvatar);
        setData({
          userDescription: response.generatedDescription,
          userBanner: response.userBanner,
          userAvatar: response.userAvatar,
          userName: name,
        });
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  const generateCard = async () => {
    printData();
    getDescription();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Edit Your Card</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Other fields */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Card Background Color</Text>
          <Picker
            selectedValue={cardBackgroundColor}
            onValueChange={(value) => setCardBackgroundColor(value)}
          >
            <Picker.Item label="Black" value="black" />
            <Picker.Item label="Green" value="green" />
            <Picker.Item label="Yellow" value="yellow" />
            <Picker.Item label="White" value="white" />
            <Picker.Item label="Orange" value="orange" />
            <Picker.Item label="Red" value="red" />
          </Picker>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name Text Color</Text>
          <Picker
            selectedValue={nameTextColor}
            onValueChange={(value) => setNameTextColor(value)}
          >
            <Picker.Item label="Black" value="black" />
            <Picker.Item label="Green" value="green" />
            <Picker.Item label="Yellow" value="yellow" />
            <Picker.Item label="White" value="white" />
            <Picker.Item label="Orange" value="orange" />
            <Picker.Item label="Red" value="red" />
          </Picker>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name Background Color</Text>
          <Picker
            selectedValue={nameBackgroundColor}
            onValueChange={(value) => setNameBackgroundColor(value)}
          >
            <Picker.Item label="Black" value="black" />
            <Picker.Item label="Green" value="green" />
            <Picker.Item label="Yellow" value="yellow" />
            <Picker.Item label="White" value="white" />
            <Picker.Item label="Orange" value="orange" />
            <Picker.Item label="Red" value="red" />
          </Picker>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name Font Weight</Text>
          <Picker
            selectedValue={nameFontWeight}
            onValueChange={(value) => setNameFontWeight(value)}
          >
            <Picker.Item label="Normal" value="normal" />
            <Picker.Item label="Semi-Bold" value="semi-bold" />
            <Picker.Item label="Bold" value="bold" />
          </Picker>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name Font Size</Text>
          <Picker
            selectedValue={nameFontSize}
            onValueChange={(value) => setNameFontSize(parseInt(value, 10))}
          >
            <Picker.Item label="10" value="10" />
            <Picker.Item label="20" value="20" />
            <Picker.Item label="30" value="30" />
          </Picker>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description Text Color</Text>
          <Picker
            selectedValue={descriptionTextColor}
            onValueChange={(value) => setDescriptionTextColor(value)}
          >
            <Picker.Item label="Black" value="black" />
            <Picker.Item label="Green" value="green" />
            <Picker.Item label="Yellow" value="yellow" />
            <Picker.Item label="White" value="white" />
            <Picker.Item label="Orange" value="orange" />
            <Picker.Item label="Red" value="red" />
          </Picker>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description Background Color</Text>
          <Picker
            selectedValue={descriptionBackgroundColor}
            onValueChange={(value) => setDescriptionBackgroundColor(value)}
          >
            <Picker.Item label="Black" value="black" />
            <Picker.Item label="Green" value="green" />
            <Picker.Item label="Yellow" value="yellow" />
            <Picker.Item label="White" value="white" />
            <Picker.Item label="Orange" value="orange" />
            <Picker.Item label="Red" value="red" />
          </Picker>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description Font Weight</Text>
          <Picker
            selectedValue={descriptionFontWeight}
            onValueChange={(value) => setDescriptionFontWeight(value)}
          >
            <Picker.Item label="Normal" value="normal" />
            <Picker.Item label="Semi-Bold" value="semi-bold" />
            <Picker.Item label="Bold" value="bold" />
          </Picker>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description Font Size</Text>
          <Picker
            selectedValue={descriptionFontSize}
            onValueChange={(value) =>
              setDescriptionFontSize(parseInt(value, 10))
            }
          >
            <Picker.Item label="10" value="10" />
            <Picker.Item label="20" value="20" />
            <Picker.Item label="30" value="30" />
          </Picker>
        </View>

        <View style={styles.descriptionContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Enter Description</Text>
            <TextInput
              style={styles.textArea}
              multiline
              numberOfLines={4}
              value={description}
              onChangeText={(e) => setDescription(e)}
              placeholder="Type your description here..."
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Enter Display Name</Text>
            <TextInput
              style={styles.textArea}
              multiline
              value={name}
              onChangeText={(e) => setName(e)}
              placeholder="Type your name here..."
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.generateCardButton}
          onPress={() => {
            generateCard();
          }}
        >
          <Text style={styles.generateCardButtonText}>Generate Your Card</Text>
        </TouchableOpacity>
        <View style={styles.cardPane}>
          <CardPane Data={Data} customStyle={Style} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin:10,
  },
  scrollViewContent: {
    paddingBottom: 30, // Add padding to the bottom for a better scroll experience
  },
  headerText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 20,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 30,
  },
  label: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
  descriptionContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 10,
  },
  textArea: {
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    flex: 1,
    textAlignVertical: "top",
  },
  cardPane: {
    flex: 1,
    marginHorizontal: 16,
  },
  generateCardButton: {
    backgroundColor: "#61605c",
    paddingHorizontal: 8,
    paddingVertical: 6,
    alignSelf: "flex-start",
    borderRadius: 5,
    
  },
  generateCardButtonText: {
    fontSize: 18,
    color: "#c9f047",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default EditCard;
