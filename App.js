import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

//Importere Firebase Services
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import { atomWithStorage } from "jotai/utils";

import { Card } from "react-native-paper";

//Importere vores componenter fra components mappe
import ProfileScreen from "./components/Login/ProfileScreen";
import LoginForm from "./components/Login/LoginForm";
import SignUpForm from "./components/Login/SignUpForm";

const firebaseConfig = {
  apiKey: "AIzaSyA03UDNpBZnHeRkLFJeoOTLD3mVQb_GM5g",
  authDomain: "inno-f31f5.firebaseapp.com",
  databaseURL:
    "https://inno-f31f5-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "inno-f31f5",
  storageBucket: "inno-f31f5.appspot.com",
  messagingSenderId: "529759488370",
  appId: "1:529759488370:web:4d99be971bc57ca3ec75eb",
};

// Define global state and export - jotai
export const atomOrders = atomWithStorage("orders", []);

// Initialize Firebase
export default function App() {
  const [user, setUser] = useState({ loggedIn: false });
  
  // Initialiser Firestore og gem den i variablen 'db'
  initializeApp(firebaseConfig);

  if (getApps().length < 1) {
    const db = getFirestore(); // Initialiser Firestore og gem den i variablen 'db'
    initializeApp(firebaseConfig);
    console.log("Firebase On!");
  } else {
    console.log("Firebase not on!");
  }

  const auth = getAuth();

  function onAuthStateChange(callback) {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        callback({ loggedIn: true, user: user });
        console.log("You are logged in!");
      } else {
        callback({ loggedIn: false });
      }
    });
  }
  // Dette useEffect-hook lytter på ændringer i brugerens autentifikationsstatus, så vi observerer om brugeren er aktiv eller ej.
  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  //Gæstekomponent der viser en sign-up og login side
  const GuestPage = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Opret eller Login med din firebase Email
        </Text>

        <Card style={{ padding: 20, margin: 20 }}>
          <SignUpForm />
        </Card>

        <Card style={{ padding: 20, margin: 20 }}>
          <LoginForm />
        </Card>
      </View>
    );
  };
  // Ternær operator der afgør hvor man bliver ført hen på hvilken siden, alt efter om man er logget ind eller ej
  return user.loggedIn ? <GuestPage /> : <ProfileScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
