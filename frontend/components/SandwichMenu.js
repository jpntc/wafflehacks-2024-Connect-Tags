import React, {useState} from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const SandwichMenu = ({ onClick}) => {
  const [isMenuOpen, setMenuOpen] = useState(false)
  return (
    <SafeAreaView>
      {isMenuOpen ? (
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            setMenuOpen(!isMenuOpen);}}
        >
          <Icon name="close" size={30} color="#000" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            setMenuOpen(!isMenuOpen);
          }}
        >
          <Icon name="bars" size={30} color="#000" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SandwichMenu;