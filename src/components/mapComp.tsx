import React from "react";
import { TouchableOpacity, StyleSheet, View, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapComp({
  initialRegion,
  handleMarkerPress,
  openModal,
  placeList
}) {


  return (
    <MapView style={styles.map} region={initialRegion}>
      {placeList.map((spot, index) => (
        <Marker
          key={index}
          coordinate={{ latitude: spot.latitude, longitude: spot.longitude }}
          title={spot.nome}
          onPress={() => handleMarkerPress(spot)}
        >
          <View style={styles.markerContainer}>
            <TouchableOpacity onPress={openModal}>
              <Image
                source={{uri:spot.imagem}}
                style={styles.markerImage}
              />
            </TouchableOpacity>
          </View>
        </Marker>
      ))}
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
