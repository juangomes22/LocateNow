import React, { useState, useEffect, useRef } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Entypo } from '@expo/vector-icons';
import * as Location from 'expo-location';

export default function CameraComp({ navigation, route }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const cameraRef = useRef(null);


    useEffect(() => {
        getCameraPermission();
   
    }, []);

    const getCameraPermission = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
    };

       

    const handleTakePhoto = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            savePhotoToGallery(photo.uri);
            route.params.addItem(photo.uri)
            navigateToMapScreen();
        }
    };

    const savePhotoToGallery = async (uri) => {
        const asset = await MediaLibrary.createAssetAsync(uri);
        const albumExists = await MediaLibrary.getAlbumAsync('LocateNow');

        if (albumExists) {
            await MediaLibrary.addAssetsToAlbumAsync([asset], albumExists, false);
        } else {
            const newAlbum = await MediaLibrary.createAlbumAsync('LocateNow', asset, false);
        }
    };

    const navigateToMapScreen = () => {
        navigation.goBack();
    };

    if (hasPermission === null) {
        return <View />;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <Camera
                style={styles.camera}
                ref={cameraRef}
            />
            <View style={styles.cameraCentro}>
                <TouchableOpacity style={styles.cameraButton} onPress={handleTakePhoto}>
                    <Entypo name="camera" size={30} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    cameraButton: {
        position: 'absolute',
        bottom: 80,
        backgroundColor: "#836FFF",
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        borderColor: '#212121',
        borderWidth: 3,
    },
    buttonText: {
        fontSize: 16,
        color: '#836FFF',
    },
    cameraCentro: {
        alignItems: 'center',
        top: 40,
    }
});
