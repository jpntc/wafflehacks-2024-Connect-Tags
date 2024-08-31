import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import HomeScreen from "./HomeScreen";
import EditCardScreen from "./EditCardScreen";
import EditBioPageScreen from "./EditBioPageScreen";

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  const [cardStyle, setCardStyle] = useState({
  });
  const [userData, setUserData] = useState({
  });

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "EditCard") {
            iconName = focused ? "create" : "create-outline";
          } else if (route.name === "EditBioPage") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        initialRouteName: "Home",
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" options={{ title: "Home" }}>
        {(props) => (
          <HomeScreen
            {...props}
            cardStyle={cardStyle}
            setCardStyle={setCardStyle}
            userData={userData}
            setUserData={setUserData}
          />
        )}
      </Tab.Screen>

      <Tab.Screen name="EditCard" options={{ title: "Edit Card" }}>
        {(props) => (
          <EditCardScreen
            {...props}
            cardStyle={cardStyle}
            setCardStyle={setCardStyle}
            userData={userData}
            setUserData={setUserData}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="EditBioPage"
        component={EditBioPageScreen}
        options={{ title: "Edit Bio" }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigation;
