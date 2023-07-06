import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"


import MapComp from "./src/components/mapComp";
import CameraComp from "./src/components/cameraComp";


const Stack = createNativeStackNavigator();




export default function App(){
    return(
       <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="map" component={MapComp}/>
            <Stack.Screen name="Camera" component={CameraComp}/>
        </Stack.Navigator>
       </NavigationContainer>
    )
}