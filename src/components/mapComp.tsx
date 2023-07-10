import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Feather } from '@expo/vector-icons';
import TouristSpotEntity from "../entities/tourist_spot_entity";
import {Image} from "expo-image"



export default function MapComp({ navigation }) {
  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {TouristSpotEntity.map((ponto, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: ponto.latitude, longitude: ponto.longitude }}
            title={ponto.nome}
          >
            <View style={styles.markerContainer}>
              <Image
                source={ponto.imagem}
                style={styles.markerImage}
              />
            </View>
            </Marker>
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
    bottom: 70,
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
  markerContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  markerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    elevation:10,
    shadowColor:'black'
  },
});
