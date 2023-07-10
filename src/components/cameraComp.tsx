import React, { useState, useEffect, useRef } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

export default function CameraComp() {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const cameraRef = useRef<Camera | null>(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
            await MediaLibrary.requestPermissionsAsync()
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const handleTakePhoto = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            savePhotoToGallery(photo.uri);
        }
    };

    const savePhotoToGallery = async (uri: string) => {
        const asset = await MediaLibrary.createAssetAsync(uri);
        const albumExists = await MediaLibrary.getAlbumAsync('My Photos');

        if (albumExists) {
            await MediaLibrary.addAssetsToAlbumAsync([asset], albumExists, false);
        } else {
            const newAlbum = await MediaLibrary.createAlbumAsync('My Photos', asset, false);
        }
    };

    return (
        <View style={styles.container}>
            <Camera
                style={styles.camera}
                ref={(ref: Camera) => (cameraRef.current = ref)}
            />
            <TouchableOpacity style={styles.takePhotoButton} onPress={handleTakePhoto}>
                <Text style={styles.buttonText}>aperta</Text>
            </TouchableOpacity>
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
    takePhotoButton: {
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: [{ translateX: -50 }],
        backgroundColor: '#212121',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
    },
});
