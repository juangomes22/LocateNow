import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Entypo } from '@expo/vector-icons';
import ModalComp from "./modalComp";
import MapComp from "./mapComp";
import * as Location from 'expo-location';

export default function Home({ navigation }) {

  const [modalVisible, setModalVisible] = useState(true);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [showInitialLocation, setShowInitialLocation] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(null); // Adicione esta linha

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowInitialLocation(false);
      setInitialRegion({
        latitude: -22.1184, // Latitude de Três Rios
        longitude: -43.2100, // Longitude de Três Rios
        latitudeDelta: 0.0150,
        longitudeDelta: 0.00100,
      });
    }, 4000);

    return () => clearTimeout(timeout);
  }, []);
  useEffect(() => {
    getLocationAsync();
  }, []);

  const getLocationAsync = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    }
  };

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
      <MapComp  initialRegion={initialRegion} showInitialLocation={showInitialLocation} handleMarkerPress={handleMarkerPress} openModal={() => { openModal(); } } takenPhoto={undefined} />

      {selectedSpot && (
        <ModalComp closeModal={closeModal} selected={selectedSpot} modalVisible={modalVisible}
        />
      )}

      <TouchableOpacity style={styles.cameraButton} onPress={() => navigation.navigate('Camera')}>
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
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  markerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderWidth:6,
    borderColor:''
  },
});
