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

                    <View style={styles.capaModalText}>
                        <Text style={styles.modalText}>{selected.nome}</Text>
                    </View>
                    
                    <Image style={styles.imgSpot} source={selected.imagem} />
                    <Text style={{ fontSize: 15, marginBottom: 10, fontWeight: "700" }}>Data da Fundação: {selected.dataFundacao}</Text>

                    <TouchableOpacity style={styles.buttonModal} onPress={closeModal}>
                        <Text style={styles.buttonText}>Fechar Modal</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    buttonModal: {
        backgroundColor: '#9E9E9E',
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 50,
        borderRadius: 5,
        marginTop: 20,
        borderColor: '#212121',
        borderWidth: 3,
        elevation: 40,
        shadowColor: '#1976D2'


    },
    buttonText: {
        fontSize: 15,
        fontWeight: "700",
        color: '#000',
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

        fontWeight: "700",
    },
    capaModalText: {
        backgroundColor: '#7c7eff',
        width: 250,
        height: 40,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent:'center',
        borderRadius: 60,
        marginBottom:10,
        borderWidth:4,
        borderColor:'#757575'
    },
    imgSpot: {
        width: '90%',
        height: 250,
        borderRadius: 5,
        marginBottom: 20,
        borderWidth: 5,
        borderColor: "#757575"

    }
});