import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  LogBox,
} from "react-native";

import GlobalStyles from "./Styling/GlobalStyles";
import ShoppingCartScreen from "./ShoppingCartScreen"; // Importer Indkøbskurvkomponenten
import { useAtom } from "jotai";
import { atomOrders } from "../App";

export default function OrderScreen({ navigation }) {
  // Use global state
  const [orders, setOrders] = useAtom(atomOrders);

  const availableMeals = [
    { name: "Sandwich m. skinke og ost", price: 25 },
    { name: "Bagel m. kylling og bacon", price: 40 },
    { name: "Pølsehorn", price: 15 },
  ];

  const showShoppingCart = () => {
    navigation.navigate("ShoppingCart");
  };

  const addToOrder = (meal) => {
    setOrders([...orders, meal]);
  };

  const totalPrice = orders.reduce((acc, meal) => acc + meal.price, 0);

  return (
    <View style={GlobalStyles.container}>
      <Text style={styles.header}>Order Screen</Text>
      <Text style={styles.info}>Her kan du se og redigere din ordre:</Text>
      <Text style={styles.subheader}>Tilgængelige madpakker:</Text>
      {availableMeals.map((meal, index) => (
        <View key={index} style={styles.mealContainer}>
          <Text>
            {meal.name} - {meal.price} kr.
          </Text>
          <Button title="Tilføj til ordre" onPress={() => addToOrder(meal)} />
        </View>
      ))}
      <Text style={styles.subheader}>Din ordre:</Text>
      {orders.map((meal, index) => (
        <View key={index} style={styles.mealContainer}>
          <Text>
            {meal.name} - {meal.price} kr.
          </Text>
        </View>
      ))}
      <Text style={styles.total}>Total pris: {totalPrice} kr.</Text>
      <Button
        title="Gå tilbage til Profile"
        onPress={() => navigation.goBack()}
      />
      <Button title="Se Ordre" onPress={showShoppingCart} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 8,
  },
  info: {
    marginBottom: 16,
  },
  subheader: {
    fontSize: 18,
    marginTop: 16,
    marginBottom: 8,
  },
  mealContainer: {
    marginBottom: 8,
  },
  total: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
  },
  modalText: {
    fontSize: 24,
    marginBottom: 16,
  },
});
