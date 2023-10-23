import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import OrderScreen from "../OrderScreen";
import MadPakker from "../MadPakker";
import GlobalStyles from "../Styling/GlobalStyles";
import ShoppingCartScreen from "../ShoppingCartScreen";
import CameraScreen from "../Camera/CameraScreen";
import ImageScreen from "../Camera/ImageScreen";
import { Title } from "react-native-paper";

// Opretter en bottom navigator ved hjælp af createBottomTabNavigator-funktionen.
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ProfileScreen({ navigation }) {
  const auth = getAuth();
  const user = auth.currentUser;
  //handleLogout håndterer log ud af en aktiv bruger.
  const handleLogOut = async () => {
    await signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  // Viewet der vises på applikationen med tekst og knapper til navigation til de forskellige komponenter
  if (!auth.currentUser) {
    return (
      <View style={GlobalStyles.container}>
        <View style={styles.infoContainer}>
          <Title style={styles.titleText}> Kantine App </Title>
          <Text style={styles.infoText}>Navn: Kenneth</Text>
          <Text style={styles.infoText}>Telefonnummer: 20 20 20 20</Text>
        </View>
        <TouchableOpacity
          style={{
            borderWidth: 3,
            borderColor: "black",
            borderRadius: 30,
            padding: 30,
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("Order")}
        >
          <Text>Bestil frokost</Text>
        </TouchableOpacity>
      </View>
    );
  }

  /*return (
        <View style={styles.container} >
            <Text>Current user: {user.email}</Text>
            <Button onPress={() => handleLogOut()} title="Log out" />
        </View>
    );
*/
}

//Lokal styling til brug i ProfileScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  titleText: {
    fontSize: 30, // Du kan justere størrelsen efter behov
    fontWeight: "bold", // Gør teksten fed
    marginBottom: 80, // Juster efter behov
  },
  infoText: {
    fontSize: 20,
    marginBottom: 5,
  },
  preferenceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  editButton: {
    marginLeft: 5,
    padding: 5,
    backgroundColor: "lightblue",
  },
});

// Navigation til de forskellige komponenter

function OrderStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CameraScreen" component={CameraScreen} />
      <Stack.Screen name="image" component={ImageScreen} />
    </Stack.Navigator>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Order" component={OrderScreen} />
        <Tab.Screen name="ShoppingCart" component={ShoppingCartScreen} />
        <Tab.Screen name="MadPakker" component={MadPakker} />
        <Tab.Screen name="Kamera" component={OrderStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
