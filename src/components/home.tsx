import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal, TextInput, Button, Image, Alert, } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Keyboard } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { onValue, push, ref, update } from 'firebase/database';
import { db } from '../../firebase-config_alternativo(2)';
import PlaceEntity from '../entities/place-entity';




const App = () => {
  const [markers, setMarkers] = useState<PlaceEntity[]>([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isCameraVisible, setCameraVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [markerImageUri, setMarkerImageUri] = useState(null);
  const [markerTitle, setMarkerTitle] = useState('');
  const [markerDescription, setMarkerDescription] = useState('');
  const [cameraType, setCameraType] = useState(Camera.Constants.Type['back']);
  const [placeDescription, setPlaceDescription] = useState('');

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

  async function getPlaces() {
    console.log('Firebase');
    return onValue(ref(db, '/places'), (snapshot) => {
      try {
        console.log(snapshot);
        setMarkers([]);
        if (snapshot) {
          snapshot.forEach((childSnapshot) => {

            const childKey = childSnapshot.key;
            let childValue = childSnapshot.val();
            childValue.id = childKey
            setMarkers((places) => [...places, (childValue as PlaceEntity)])
            console.log(markers.length)
          });
        }
      }
      catch (e) {
        console.log(e);
      }
    })
    async function updateItem() {
      update(ref(db, '/places/' + setCurrentLocation),setCurrentLocation );
      setShowDialog({ showDialog:false });
      setPlaceDescription('');
  }
  };



  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const cameraRef = useRef(null);

  useEffect(() => {
    getLocationPermission();
    getPlaces();
  }, []);

  const getLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permissão de localização  concedida');
    } else {
      getCurrentLocation();
    }
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
        coords: {latitude: currentLocation.latitude, longitude: currentLocation.longitude},
        imagePath: capturedImage,
        title: '',
        description: '',
        photoDate: Date().toString()
      };
      setMarkers([...markers, newMarker]);
    }
    setCameraVisible(false);

    push(ref(db,'places'),handleAddMarker)
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
        coords: {latitude: currentLocation.latitude, longitude: currentLocation.longitude},
        imagePath: photo.uri,
        title: '',
        description: '',
        photoDate: Date().toString()
      };
      setMarkers([...markers, newMarker]);

      setCapturedImage(photo.uri);
      setCameraVisible(false);
      handleAddMarker();
    }
  };

  const renderMarkerCallout = (marker:PlaceEntity) => (
    <TouchableOpacity onPress={dismissKeyboard}>
      <Image source={{ uri: marker.imagePath }} style={styles.markerImage} />
      <Text style={{ textAlign: 'center', fontWeight: 'bold', fontStyle: 'italic', color: '#303F9F' }}>
        {marker.title}
      </Text>
    </TouchableOpacity>
  );

  const handleMarkerPress = (marker:PlaceEntity) => {
    setMarkerImageUri(marker.imagePath);
    setMarkerTitle(marker.title);
    setMarkerDescription(marker.description);
    setModalVisible(true);
  };


  const handleDeleteMarker = (imageUri) => {
    const updatedMarkers = markers.filter((marker) => marker.imagePath !== imageUri);
    setMarkers(updatedMarkers);
    setModalVisible(false);
  };

  const handleSaveMarker = () => {
    const updatedMarkers = markers.map((marker) => {
      if (marker.imagePath === markerImageUri) {
        return {
          ...marker,
          title: markerTitle,
          description: markerDescription,
          id: Math.random().toString(), 
          imagepath: markerImageUri,
          photoDate: Date().toString(),
          coords:{latitude:currentLocation.latitude, longitude:currentLocation.longitude}
        };
      }
      return marker;
    });

    setMarkers(updatedMarkers);
    setModalVisible(false);
    dismissKeyboard();
  };

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
          {
          markers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={marker.coords}
              onPress={() => handleMarkerPress(marker)}
            >
              
              <Image source={{ uri: marker.imagePath }} style={styles.markerImage} />
              
              
            </Marker>
          ))}
        </MapView>
      ) : (
        <Text style={styles.loadingText}>Carregando mapa...</Text>
      )}

      {!isCameraVisible && (
        <TouchableOpacity style={styles.buttonContainer} onPress={handleOpenCamera}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="camera-alt" size={34} color="black" />
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
            <MaterialIcons name="camera-alt" size={34} color="black" />
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
              <TextInput
                style={styles.input}
                placeholder="Descrição"
                value={markerDescription}
                onChangeText={setMarkerDescription}
              />

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Button title="Salvar" onPress={handleSaveMarker} />
                <Button title="Deletar" onPress={handleDeleteConfirmation} />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
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
  },
});

export default App;


function setShowDialog(arg0: { showDialog: boolean; }) {
  throw new Error('Function not implemented.');
}

function setPlaceDescription(arg0: string) {
  throw new Error('Function not implemented.');
}

