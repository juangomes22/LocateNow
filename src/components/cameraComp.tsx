import React, { useState, useEffect, useRef } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Entypo } from '@expo/vector-icons';


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
        backgroundColor: "#2196F3",
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
        color: '#fff',
    },
    cameraCentro:{
        alignItems:'center',
        top:40,
    }
});
