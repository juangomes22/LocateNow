import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableHighlight, View, Modal, Text, Image, } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import PlaceEntity from '../entities/place-entity';
import { onValue, ref } from 'firebase/database';
import { db } from '../../firebase-config_alternativo(2)';


export default function HomePage({ navigation }) {
  const [markers, setMarkers] = useState<PlaceEntity[]>([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);

  async function getPlaces() {
    console.log('Firebase');
    return onValue(ref(db, '/places'), (snapshot) => {
      try {
        console.log(snapshot);
        setMarkers([]);
        if (snapshot! == undefined) {
          snapshot.forEach((childSnapshot) => {

            const childKey = childSnapshot.key;

            let childValue = childSnapshot.val();
            childValue.id = childKey
            setMarkers((places) => [...places, (childValue as PlaceEntity)])

          })
        }
      }
      catch (e) {
        console.log(e);
      }
    })
  };
  useEffect(() => {
    getLocationPermission();
    getPlaces();
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
              coordinate={{ latitude: item.coords.latitude, longitude: item.coords.longitude }}
              description={item.description}
              onPress={() => openModal(item)}
            >
              <View style={{ overflow: 'hidden', borderRadius: 45 }}>
                <Image style={styles.img} source={{ uri: item.imagePath }} />
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
    alignItems: 'center',
    justifyContent: 'center',
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