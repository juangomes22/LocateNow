import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Entypo } from '@expo/vector-icons';
import ModalComp from "./modalComp";
import * as Location from 'expo-location';
import TouristSpotEntity from "../entities/tourist_spot_entity";
import MapComp from "./mapComp";

export default function Home({ navigation }) {

  const [modalVisible, setModalVisible] = useState(true);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [placeList, setPlaceList] = useState(TouristSpotEntity)

  useEffect(() => {
    initMap();

  }, []);


  async function getCurrentLocation(): Promise<Location.LocationObject> {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      let location = await Location.getCurrentPositionAsync({});
      return location;
    }
  }

  async function initMap() {
    const position = await getCurrentLocation();
    setInitialRegion({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      latitudeDelta: 0.0150,
      longitudeDelta: 0.00100,
    })
  }

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

  async function addItem(imageUrl: string) {
    const position = await getCurrentLocation();
    console.log(position)
    let newPlace = {
      nome: 'Horto Municipal',
      imagem: imageUrl,
      dataFundacao: '1 de janeiro de 1985',
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    }
    let places = placeList
    places.push(newPlace)
    setPlaceList(places)
    initMap()
  }

  return (
    <View style={styles.container}>
      <MapComp
        initialRegion={initialRegion}
        handleMarkerPress={handleMarkerPress}
        openModal={() => { openModal() }}
        placeList={placeList} />

      {selectedSpot && (
        <ModalComp closeModal={closeModal} selected={selectedSpot} modalVisible={modalVisible}
        />
      )}

      <TouchableOpacity style={styles.cameraButton} onPress={() => navigation.navigate('Camera', { addItem: (imageUrl) => addItem(imageUrl) })}>
        <Entypo name="camera" size={30} color="black" />
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
    bottom: 80,
    right: 15,
    backgroundColor: "#2196F3",
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    borderColor: '#212121',
    borderWidth: 3,
  },
  markerContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'black',
  },
  markerImage: {
    width: '100%',
    height: '100%',
  },
  takenPhotoMarker: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
  },
});
