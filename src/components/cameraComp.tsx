import React, { useState, useEffect, useRef } from "react";
import { TouchableOpacity, Text, StyleSheet, View, Image } from "react-native";
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Entypo } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { getDownloadURL, getStorage, ref, uploadBytes } from "@firebase/storage";
import { app } from "../../firebase-config_alternativo(2)";


export default function CameraComp({ navigation, route }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const cameraRef = useRef(null);
    const [IsUploading, setIsUploading] = useState(false)

async function uploadImage (imageUrl): Promise<string>{
    setIsUploading(true);
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const storage = getStorage(app);
    const storageRef = ref(
        storage,
        'iamgens/' + imageUrl.replace(/^.*[\\\/]/, '')
    );
    const upload = await uploadBytes(storageRef, blob);

    const uploadedImagemUrl = await getDownloadURL (storageRef);
    console.log(uploadedImagemUrl);
    setIsUploading(false);
    return uploadedImagemUrl;
}
    



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
            >
            {
        IsUploading ?
        <View style={{
          width:'100',
          height:'100%',
          backgroundColor: 'black',
          opacity:0.8,
          justifyContent: "center",
          alignItems:'center'

        }}>

          <Image style={{width:100, height:80}}
            source={{uri:''}}/>
            <Text style={{color: 'white'}}> Aguarde...</Text>
            </View>:<></>
      }
            </Camera>
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
function setIsUploading(arg0: boolean) {
    throw new Error("Function not implemented.");
}

