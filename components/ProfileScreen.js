import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import OrderScreen from "./OrderScreen";
import MadPakker from "./MadPakker";

// Opretter en bottom navigator ved hjælp af createBottomTabNavigator-funktionen.
const Tab = createBottomTabNavigator();

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
  if (auth.currentUser) {
    return (
      <View style={styles.container}>
        <Text>Ens profil hvor ens oplysninger står og mad præferencer</Text>
        <Text>Name</Text>
        <Text>Phone number</Text>
        <Text>Address</Text>
        <View style={styles.preferenceContainer}>
          <Text>Food preference</Text>
          <Button title="edit" style={styles.editButton} />
        </View>
        <Button
          title="Gå til dine ordre"
          onPress={() => navigation.navigate("Order")}
        />
        <Button
          title="Gå til indkøb af madpakker"
          onPress={() => navigation.navigate("MadPakker")}
        />
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
function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Order" component={OrderScreen} />
      <Tab.Screen name="MadPakker" component={MadPakker} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
