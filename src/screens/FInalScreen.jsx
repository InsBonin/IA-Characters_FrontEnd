import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { font } from "../theme/fonts";

const FinalScreen = ({ navigation, route }) => {
    const { classe_prevista, probabilidade } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Resultados:</Text>
            <Text style={styles.title}>Classe prevista: {classe_prevista}</Text>
            <Text style={styles.title}>Probabilidade: {(probabilidade * 100).toFixed(2)}%</Text>
            <TouchableOpacity style={styles.blueButton} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.buttonText}>Retornar para o início</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: font.regular,
        fontSize: '1.5rem'
    },
    blueButton: {
        backgroundColor: '#007BFF',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    }
});

export default FinalScreen;
