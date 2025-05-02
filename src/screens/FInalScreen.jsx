import { StyleSheet, Text, View } from "react-native";
import { font } from "../theme/fonts";

const FinalScreen = ({ navigation, route }) => {
    const { classe_prevista, probabilidade } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Resultados:</Text>
            <Text style={styles.title}>Classe prevista: {classe_prevista}</Text>
            <Text style={styles.title}>Probabilidade: {(probabilidade * 100).toFixed(2)}%</Text>
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
        fontFamily: font.bold,
        fontSize: '2rem'
    }
});

export default FinalScreen;
