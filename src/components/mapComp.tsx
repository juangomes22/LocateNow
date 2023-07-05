import { Component } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import MapView from "react-native-maps";


export default function MapComp() {
    return (
        <SafeAreaView>
            <MapView style={styles.map} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
    },
});