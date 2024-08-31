import React, { useState, useRef, useEffect} from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  ImageBackground,
} from "react-native";
import ViewShot from "react-native-view-shot";

const CardPane = ({ Data, customStyle}) => {
  const [imgUri, setImgUri] = useState("");
  const viewShotRef = useRef(null);
  const [cardStyle, setCardStyle] = useState({});
  const [userData, setUserData] = useState({})

    useEffect(() => {

      setCardStyle(customStyle)
      setUserData(Data)
      console.log(cardStyle)
    }, [Data, customStyle]); 
// {
//      cardBackgroundColor:"",
//      textColor: "#000000",
//      nameFontSize: 16,
//      nameFontStyle:"",
//      nameFontWeight:"",
//      nameFontColor:"",
//      borderRadius: 8,
//      holeColor:"black",
//      holeRadius:10,
//      descriptionBackgroundColor:"black"
//      descriptionFontSize:""
//      descriptionFontWeight:10,
//      descriptionTextColor:"black" 
//      descriptionBackgroundColor:"grey"
//    }
  const captureCard = () => {
    viewShotRef.current.capture().then((uri) => {
      console.log("Card saved to:", uri);
      // Save the URI to your database or use it for printing
    });
  };
  return (
    <ViewShot
      ref={viewShotRef}
      options={{ format: "jpg", quality: 0.9 }}
      style={{
        flex: 0.9,
        marginTop: 15,
        backgroundColor: cardStyle.cardBackgroundColor,
        borderRadius:10,
      }}
    >
      <View
        style={{
          paddingHorizontal: 6,
          flex: 1,
          paddingVertical: 5,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "",
        }}
      >
        <View
          style={{
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: cardStyle.holeColor,
            borderRadius: cardStyle.holeRadius,
            width: 40,
            height: 40,
            borderWidth: 3,
          }}
        ></View>
        <View style={styles.descriptionView}>
          <Text
            style={{
              fontSize: cardStyle.descriptionFontSize,
              fontWeight: cardStyle.descriptionFontWeight,
              color: cardStyle.descriptionTextColor,
              backgroundColor: cardStyle.descriptionBackgroundColor,
              borderRadius: 10,
             
            }}
          >
            {userData.userDescription}
          </Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
          position: "fixed",
          top: 30,
          zIndex:20,
          padding:4,
        }}
      >
        <Image source={{ uri: userData.userAvatar }} style={styles.avatar} />
        <Text
          style={{
            FontFace: cardStyle.nameFontStyle,
            fontWeight: cardStyle.nameFontWeight,
            fontSize: cardStyle.nameFontSize,
            color: cardStyle.nameTextColor,
            marginLeft: 10,
            backgroundColor: cardStyle.nameBackgroundColor
          }}
        >
          {userData.userName}
        </Text>
      </View>
      <ImageBackground
        source={{ uri: userData.userBanner }}
        style={styles.banner}
      ></ImageBackground>
    </ViewShot>
  );
};

const styles = StyleSheet.create({
  descriptionView: {
    padding: 4,
    justifyContent: "center",
    borderRadius:10,
  },
  banner: {
    flex: 1,
  },
  avatar: {
    width: 120,
    height: 120,
    borderColor: "green",
    borderWidth: 2,
    borderRadius: 100,
  },
});
export default CardPane;
