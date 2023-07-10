import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Image } from 'expo-image'


export default function ModalComp({ closeModal, selected, modalVisible }) {


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>{selected.nome}</Text>
                    <Image style={styles.imgSpot} source={selected.imagem} />
                    <Text style={styles.modalText}>Data da Fundação: {selected.dataFundacao}</Text>
                    <TouchableOpacity onPress={closeModal}>
                        <Text style={styles.buttonText}>Fechar Modal</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    buttonText: {
        fontSize: 15,
        fontWeight: "700",
        color: '#000',
        marginTop: 90,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: '90%',
        marginBottom: 100,
        borderWidth: 5,
        borderColor: "#7c7eff"
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: "700",

    },
    imgSpot: {
        width: '90%',
        height: 250,
        borderRadius: 5,
        marginBottom: 20,
        borderWidth: 5,
        borderColor: "#4d4d4d"
    }
});