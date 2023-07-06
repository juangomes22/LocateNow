

import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Feather } from '@expo/vector-icons';
import TouristSpotEntity from '../entities/tourist_spot_entity'

export default function MapComp({ navigation }) {
  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {TouristSpotEntity.map((ponto, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: ponto.latitude, longitude: ponto.longitude }}
            title={ponto.nome}
            
          />
        ))}
      </MapView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Camera');
        }}
      >
        <Text style={styles.buttonText}>
          <Feather name="camera" size={24} color="black" />
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  button: {
    bottom: 50,
    right: 20,
    backgroundColor: "transparent",
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderColor: '#212121',
    borderWidth: 3,
    position: 'absolute',
  },
  buttonText: {
    fontSize: 15,
    color: '#fff',
  },
});
