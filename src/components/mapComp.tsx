import { TouchableOpacity, Text, StyleSheet, SafeAreaView, View } from "react-native";
import MapView from "react-native-maps";



export default function MapComp() {
    return (
        <View>

            <MapView style={styles.map} />

            <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonText}>VAMOS!!!</Text>
            </TouchableOpacity>
        </View>


    );
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',

    },
    button: {
        marginBottom: 30,
        backgroundColor: '#e57702',
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderColor: '#fba346',
        borderWidth: 5,
        alignContent:'center',
        flex:1
    },
    buttonText: {
        fontSize: 15,
        color: '#fff'
    }
});