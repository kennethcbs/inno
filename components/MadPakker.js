import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, FlatList, Modal } from "react-native";
import { getDatabase, ref, push, onValue } from "firebase/database";

import GlobalStyles from "./Styling/GlobalStyles";
import CameraScreen from "./Camera/CameraScreen";

export default function MadPakker({ navigation, route }) {
  const [madpakker, setMadpakker] = useState([]);
  const [navn, setNavn] = useState("");
  const [pris, setPris] = useState("");
  const [indhold, setIndhold] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentOrder, setCurrentOrder] = useState([]);

  const db = getDatabase();
  const madpakkeRef = ref(db, "Madpakker");

  const addToCurrentOrder = (item) => {
    setCurrentOrder((prevOrder) => [...prevOrder, item]);
  };

  // Lytter efter ændringer i databasen og opdaterer madpakker, hvis der er data tilgængelig
  useEffect(() => {
    onValue(madpakkeRef, (snapshot) => {
      const data = snapshot.val();
      if (data != undefined) {
        setMadpakker(data);
        console.log({ data });
      }
    });
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const tilføj = async () => {
    await push(madpakkeRef, { navn, pris, indhold });
    setNavn("");
    setPris("");
    setIndhold("");
    toggleModal(); // Luk modal efter tilføjelse
  };

  // Tager objektet og laver det til en liste (array)
  const madpakkeArray = Object.values(madpakker);

  return (
    <View style={GlobalStyles.container}>
      <FlatList
        data={madpakkeArray}
        renderItem={({ item, index }) => {
          return (
            <View key={index}>
              <Text style={{ color: "black" }}>
                {item.navn} - Pris: {item.pris} kr.
              </Text>
              <Text style={{ color: "black" }}>Indhold: {item.indhold}</Text>
            </View>
          );
        }}
      />

      <Text style={{ color: "black", marginTop: 10 }}>Indkøb af madpakker</Text>
      <Button title="Tilføj madpakke" onPress={toggleModal} />

      <Modal visible={isModalVisible} animationType="slide">
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TextInput
            placeholder="Navn"
            placeholderTextColor="black"
            value={navn}
            onChangeText={(text) => setNavn(text)}
            style={{ color: "black", marginBottom: 10 }}
          />
          <TextInput
            placeholder="Pris"
            placeholderTextColor="black"
            value={pris}
            onChangeText={(text) => setPris(text)}
            style={{ color: "black", marginBottom: 10 }}
          />
          <TextInput
            placeholder="Indhold"
            placeholderTextColor="black"
            value={indhold}
            onChangeText={(text) => setIndhold(text)}
            style={{ color: "black", marginBottom: 10 }}
          />
          <Button title="Tilføj madpakke" onPress={tilføj} />
          <Button title="Luk" onPress={toggleModal} />
        </View>
      </Modal>
      <CameraScreen route={route} addToCurrentOrder={addToCurrentOrder} />
    </View>
  );
}
