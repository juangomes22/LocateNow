import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapComp from './src/components/mapComp';
import CameraComp from './src/components/cameraComp';

export default function App() {
  return (
    <View>

      <MapComp/>
      <CameraComp/>
    </View>
  );
}

