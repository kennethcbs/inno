import React from 'react';
import { View, Text, Button } from 'react-native';

export default function OrderScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Order Screen</Text>
      <Text>Her skal ens ordre være hvor man kan se hvilken madpakke kasse man har bestilt til ugen</Text>
      <Button
        title="Gå tilbage til Profile"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}
