import React from "react";
import { TouchableOpacity, StyleSheet, View, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import TouristSpotEntity from "../entities/tourist_spot_entity";

export default function MapComp({
  initialRegion,
  showInitialLocation,
  handleMarkerPress,
  openModal,
  takenPhoto,
}) {
  return (
    <MapView style={styles.map} region={initialRegion}>
      {showInitialLocation && initialRegion && (
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

      {/* Exibir a imagem do ponto turístico */}
      {takenPhoto && (
        <Marker
          coordinate={{
            latitude: takenPhoto.location.latitude,
            longitude: takenPhoto.location.longitude,
          }}
        >
          <Image source={{ uri: takenPhoto.uri }} style={styles.takenPhotoMarker} />
        </Marker>
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
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
