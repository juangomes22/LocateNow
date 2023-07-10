import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Entypo } from '@expo/vector-icons';
import TouristSpotEntity from "../entities/tourist_spot_entity";
import { Image } from "expo-image"
import ModalComp from "./modalComp";

export default function Home({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [showInitialLocation, setShowInitialLocation] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowInitialLocation(false);
      setInitialRegion({
        latitude: -22.1184, // Latitude de Três Rios
        longitude: -43.2187, // Longitude de Três Rios
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }, 4000);

    return () => clearTimeout(timeout);
  }, []);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleMarkerPress = (spot) => {
    setSelectedSpot(spot);
    openModal();
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={initialRegion}>
        {showInitialLocation && initialRegion &&(
          <Marker
            coordinate={{
              latitude: initialRegion.latitude,
              longitude: initialRegion.longitude,
            }}
            title="Initial Location"
          />
        )}

        {TouristSpotEntity.map((spot, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: spot.latitude, longitude: spot.longitude }}
            title={spot.nome}
            onPress={() => handleMarkerPress(spot)}
          >
            <View style={styles.markerContainer}>
              <TouchableOpacity onPress={openModal}>
              <Image
                source={spot.imagem}
                style={styles.markerImage}
              />
              </TouchableOpacity>
            </View>
          </Marker>
        ))}
      </MapView>

      {selectedSpot && (
        <ModalComp closeModal={closeModal} selected={selectedSpot} modalVisible={modalVisible}
        />
      )}

      <TouchableOpacity style={styles.cameraButton} onPress={() => navigation.navigate('Camera')}>
        <Entypo name="camera" size={24} color="black" />
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
  cameraButton: {
    position: 'absolute',
    bottom: 60,
    right: 20,
    backgroundColor: "transparent",
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    borderColor: '#212121',
    borderWidth: 1,
  },
  infoButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: "transparent",
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: '#212121',
    borderWidth: 1,
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
  },
});
