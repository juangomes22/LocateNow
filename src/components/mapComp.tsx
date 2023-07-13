import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Modal,
  Text,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';

export default function HomePage({ navigation }) {
  const [markers, setMarkers] = useState([
    {
      id: 1,
      description: 'Praça São Sebastião',
      data: 'Construída em 1912',
      latitude: -22.1166235,
      longitude: -43.2099970,
      images:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXVrTAr0TGmpk5-PdlxqeTltHruaygMHRZkQ&usqp=CAU',
    },
    {
      id: 2,
      description: 'Praça da Autonomia',
      data: 'Construída no século XIX',
      latitude: -22.1151987,
      longitude: -43.2066421,
      images:
        'https://www.guiadoturismobrasil.com/up/img/1443895061.jpg',
    },
    {
      id: 3,
      description: 'Viaduto',
      data: 'Inaugurado em 2007',
      latitude: -22.1183,
      longitude: -43.2095,
      images:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5Og8LUNqMcbbNXKkV55mTCqFSwEyM0FbeUk1WGbYzvl2Cwea7e3hNJL9s-oU5CVjUQA4&usqp=CAU',
    },

  ]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    getLocationPermission();
  }, []);

  const getLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permissão de localização não concedida');
    } else {
      getCurrentLocation();
    }
  };

  const getCurrentLocation = async () => {
    const { coords } = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = coords;
    setCurrentLocation({ latitude, longitude });
  };

  const openModal = (marker) => {
    setSelectedMarker(marker);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -22.1234,
          longitude: -43.2096,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true} 
      >
        {markers.map((item) => {
          return (
            <Marker
              key={item.id}
              coordinate={{ latitude: item.latitude, longitude: item.longitude }}
              description={item.description}
              onPress={() => openModal(item)}
            >
              <View style={{ overflow: 'hidden', borderRadius: 45 }}>
                <Image style={styles.img} source={{ uri: item.images }} />
              </View>
            </Marker>
          );
        })}
      </MapView>

    

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          {selectedMarker && (
            <View style={styles.modalContent}>
              <Text style={styles.modalDescription}>{selectedMarker.description}</Text>
              <Image style={styles.modalImage} source={{ uri: selectedMarker.images }} />
              
              <Text style={styles.modalData}>{selectedMarker.data}</Text>
              <TouchableHighlight style={styles.modalButton} onPress={closeModal}>
                <Text style={styles.modalButtonText}>Fechar</Text>
              </TouchableHighlight>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalImage: {
    width: 300,
    height: 300,
    marginBottom: 10,
    borderRadius: 10,
    
  },
  modalDescription: {
    fontSize: 20,
    alignItems:'center',
    justifyContent:'center',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalData: {
    fontSize: 15,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#836FFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});