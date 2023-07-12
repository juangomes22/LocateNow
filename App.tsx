import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import CameraComp from "./src/components/cameraComp";
import Home from "./src/components/home";
import React from "react";



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Camera" component={CameraComp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
