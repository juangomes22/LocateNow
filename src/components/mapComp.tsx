// import { TouchableOpacity, StyleSheet, View } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import TouristSpotEntity from "../entities/tourist_spot_entity";
// import { Image } from "expo-image"
// import React from "react";


// export default function MapComp({

//     initialRegion,
//     showInitialLocation,
//     handleMarkerPress,
//     openModal }) {

//     return (
//         <MapView style={styles.map} region={initialRegion}>
//             {showInitialLocation && initialRegion && (
//                 <Marker
//                     coordinate={{
//                         latitude: initialRegion.latitude,
//                         longitude: initialRegion.longitude,
//                     }}
//                     title="Initial Location"
//                 />
//             )}

//             {TouristSpotEntity.map((spot, index) => (
//                 <Marker
//                     key={index}
//                     coordinate={{ latitude: spot.latitude, longitude: spot.longitude }}
//                     title={spot.nome}
//                     onPress={() => handleMarkerPress(spot)}
//                 >
//                     <View style={styles.markerContainer}>
//                         <TouchableOpacity onPress={openModal}>
//                             <Image
//                                 source={spot.imagem}
//                                 style={styles.markerImage}
//                             />
//                         </TouchableOpacity>
//                     </View>
//                 </Marker>
//             ))}
//         </MapView>
//     )
// }
// const styles = StyleSheet.create({
//     map: {
//         flex: 1,
//     },
//     markerContainer: {
//         width: 50,
//         height: 50,
//         borderRadius: 25,
//         overflow: 'hidden',
//     },
//     markerImage: {
//         width: '100%',
//         height: '100%',
//         resizeMode: 'cover',
//     },
// });