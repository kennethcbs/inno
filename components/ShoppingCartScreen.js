import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";

import GlobalStyles from "./Styling/GlobalStyles";
import { useAtom } from "jotai";
import { atomOrders } from "../App";

const ShoppingCartScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  // Use global state
  const [orders, setOrders] = useAtom(atomOrders);

  const placeOrder = () => {
    // Her implementeres funktionaliteten til at sende ordren til kantinen
    toggleModal(); // Vis pop-up vindue
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const removeFromOrder = (index) => {
    const updatedOrder = [...orders];
    updatedOrder.splice(index, 1);
    setOrders(updatedOrder);
  };

  return (
    <View style={GlobalStyles.container}>
      <Text style={styles.header}>Indkøbskurv</Text>
      <FlatList
        data={orders} // 'orders' er dataen, der vil blive brugt til at fylde FlatList
        keyExtractor={(item, index) => index.toString()} // 'keyExtractor' bruges til at generere en unik nøgle for hver genstand i listen
        renderItem={(
          { item, index } // 'renderItem' definerer, hvordan hver genstand i listen skal vises
        ) => (
          <View style={styles.orderItem}>
            <Text>
              {item.name} - {item.price} kr.
            </Text>
            <Button
              title="Fjern"
              onPress={() => {
                removeFromOrder(index);
              }}
            />
          </View>
        )}
      />
      <TouchableOpacity
        style={{
          bottom: 200,
          borderWidth: 3,
          borderColor: "black",
          borderRadius: 30,
          padding: 30,
        }}
        onPress={placeOrder}
      >
        <Text>Bestil til kantinen</Text>
      </TouchableOpacity>
      <Modal visible={isModalVisible} animationType="fade">
        <View style={GlobalStyles.container}>
          <Text style={styles.modalText}>Maden er bestilt!</Text>
          <Button title="Luk" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  modalText: {
    fontSize: 24,
    marginBottom: 16,
  },
});

export default ShoppingCartScreen;
