<<<<<<< HEAD
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  TextInput,
  Button,
  Image,
  Alert,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Keyboard } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
=======
import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Entypo } from '@expo/vector-icons';
import ModalComp from "./modalComp";
import * as Location from 'expo-location';
import TouristSpotEntity from "../entities/tourist_spot_entity";
import MapComp from "./mapComp";
>>>>>>> 9e96c607d52589145c13861cbe195de33e953303

const App = () => {
  const [markers, setMarkers] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isCameraVisible, setCameraVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [markerImageUri, setMarkerImageUri] = useState(null);
  const [markerTitle, setMarkerTitle] = useState('');
  const [markerDescription, setMarkerDescription] = useState('');
  const [cameraType, setCameraType] = useState(Camera.Constants.Type['back']);

<<<<<<< HEAD
  
  const handleDeleteConfirmation = () => {
    Alert.alert(
      'Confirmação',
      'Tem certeza de que deseja excluir?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => handleDeleteMarker(markerImageUri) },
      ]
    );
  };


  

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const cameraRef = useRef(null);

  useEffect(() => {
    getLocationPermission();
  }, []);

  const getLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permissão de localização não concedida');
    } else {
      getCurrentLocation();
=======
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
>>>>>>> 9e96c607d52589145c13861cbe195de33e953303
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

  const getCurrentLocation = async () => {
    const { coords } = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = coords;
    setCurrentLocation({ latitude, longitude });
  };

  const handleAddMarker = () => {
    if (currentLocation && capturedImage) {
      const newMarker = {
        id: markers.length.toString(),
        coordinate: currentLocation,
        imageUri: capturedImage,
        title: '',
        description: '',
      };
      setMarkers([...markers, newMarker]);
    }
    setCameraVisible(false);
  };

  const saveToGallery = async (photoUri) => {
    try {
      await MediaLibrary.saveToLibraryAsync(photoUri);
      console.log('Imagem salva na galeria');
    } catch (error) {
      console.log('Erro ao salvar imagem na galeria:', error);
    }
  };

  const handleOpenCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permissão da câmera não concedida');
    } else {
      setCameraVisible(true);
    }
  };

  const handleCaptureImage = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      await saveToGallery(photo.uri);

      const newMarker = {
        id: markers.length.toString(),
        coordinate: currentLocation,
        imageUri: photo.uri,
        title: '',
        description: '',
      };
      setMarkers([...markers, newMarker]);

      setCapturedImage(photo.uri);
      setCameraVisible(false);
      handleAddMarker();
    }
  };

  const renderMarkerCallout = (marker) => (
    <TouchableOpacity onPress={dismissKeyboard}>
      <Image source={{ uri: marker.imageUri }} style={styles.markerImage} />
      <Text style={{ textAlign: 'center', fontWeight: 'bold', fontStyle: 'italic', color: '#303F9F' }}>
        {marker.title}
      </Text>
    </TouchableOpacity>
  );

  const handleMarkerPress = (marker) => {
    setMarkerImageUri(marker.imageUri);
    setMarkerTitle(marker.title);
    setMarkerDescription(marker.description);
    setModalVisible(true);
  };


  const handleDeleteMarker = (imageUri) => {
    const updatedMarkers = markers.filter((marker) => marker.imageUri !== imageUri);
    setMarkers(updatedMarkers);
    setModalVisible(false);
  };

  const handleSaveMarker = () => {
    const updatedMarkers = markers.map((marker) => {
      if (marker.imageUri === markerImageUri) {
        return {
          ...marker,
          title: markerTitle,
          description: markerDescription,
        };
      }
      return marker;
    });

    setMarkers(updatedMarkers);
    setModalVisible(false);
    dismissKeyboard();
  };

<<<<<<< HEAD
  const toggleCameraType = () => {
    setCameraType((prevType) =>
      prevType === Camera.Constants.Type['back']
        ? Camera.Constants.Type['front']
        : Camera.Constants.Type['back']
    );
  };

  return (
    <View style={styles.container}>
      {currentLocation ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={marker.coordinate}
              onPress={() => handleMarkerPress(marker)}
            >
              {renderMarkerCallout(marker)}
            </Marker>
          ))}
        </MapView>
      ) : (
        <Text style={styles.loadingText}>Carregando mapa...</Text>
      )}

      {!isCameraVisible && (
        <TouchableOpacity style={styles.buttonContainer} onPress={handleOpenCamera}>
          <View style={styles.iconContainer}>
          <MaterialIcons name="camera-alt" size={34} color="black"  />
          </View>
        </TouchableOpacity>
      )}

      {isCameraVisible && (
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFillObject}
          type={cameraType}
          onCameraReady={() => console.log('Câmera pronta')}
          onMountError={(error) => console.log('Erro ao montar a câmera:', error)}
        >
          <TouchableOpacity style={styles.captureButton} onPress={handleCaptureImage}>
           <MaterialIcons name="camera-alt" size={34} color="black"  />
          </TouchableOpacity>
          <TouchableOpacity style={styles.toggleButton} onPress={toggleCameraType}>
          <AntDesign name="retweet" size={24} color="black" />
          </TouchableOpacity>
          
        </Camera>
      )}

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <TouchableOpacity activeOpacity={1} style={styles.modalContainer} onPress={dismissKeyboard}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {markerImageUri && (
                <>
                  <Image source={{ uri: markerImageUri }} style={styles.modalImage} />
                </>
              )}
              <TextInput
                style={styles.input}
                placeholder="Título"
                value={markerTitle}
                onChangeText={setMarkerTitle}
              />
              
              <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                <Button title="Salvar" onPress={handleSaveMarker} />
                <Button title="Deletar" onPress={handleDeleteConfirmation} />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
=======
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
>>>>>>> 9e96c607d52589145c13861cbe195de33e953303
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingText: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 16,
    marginTop: 320,
  },
<<<<<<< HEAD
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    right: 30,
    backgroundColor: '#836FFF',
    borderRadius: 40,
    padding: 15,
    elevation: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  captureButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#836FFF',
    borderRadius: 40,
    padding: 15,
    elevation: 5,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    backgroundColor: '#836FFF',
    borderRadius: 20,
    padding: 10,
    elevation: 5,
  },
  toggleButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'flex-end',
    backgroundColor: '#836FFF',
    borderRadius: 40,
    padding: 15,
    elevation: 5,
    right: 10,
  },
  markerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'cover',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalImage: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
=======
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
>>>>>>> 9e96c607d52589145c13861cbe195de33e953303
  },
});

export default App;