import React, { useState, useEffect } from "react";
import { View, Text, Button, LogBox, FlatList } from "react-native";
import {
  getDatabase,
  ref,
  push,
  onValue
} from "firebase/database";

export default function MadPakker({ navigation }) {
  const [madpakker, setMadpakker] = useState([]);
  const db = getDatabase();
  const madpakkeRef = ref(db, "Madpakker");

  //Lytter efter ændringer i databasen og opdaterer madpakker, hvis der er data tilgængelig
  useEffect(() => {
    // OnValue = Lytter efter ændringer i databasen 
    onValue(madpakkeRef, (snapshot) => {
      const data = snapshot.val();
      if (data != undefined) {
        setMadpakker(data);
        console.log({ data });
      }
    });
  }, []);

  // Skubber værdierne amount og test ind i databasen (madpakkeRef)
  const tilføj = async () => {
    await push(madpakkeRef, { amount: 5, test: "lol" });
  };

  // Tager objektet og laver det til en liste (array) 
  const madpakkeArray = Object.values(madpakker);


  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      
      <FlatList
      // Laver en flatliste af min madpakkeArray som kommer fra databasen
        data={madpakkeArray}
        renderItem={({ item, index }) => {
          return (
            <View>
              <Text>{item.test}</Text>
              <Text>{item.amount}</Text>
            </View>
          );
        }}
      ></FlatList>
      <Text>Indkøb af madpakker</Text>

      <Button
        title="Gå tilbage til Profile"
        onPress={() => navigation.goBack()}
      />
      <Button title="Tilføj" onPress={() => tilføj()}>
        TIlføj random madpakke
      </Button>
    </View>
  );
}
