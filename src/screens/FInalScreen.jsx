import { StyleSheet, Text, View } from "react-native";

const FinalScreen = ({ navigation, route }) => {
    const { classe_prevista, probabilidade } = route.params;

    return (
        <View style={styles.container}>
            <Text>Resultados:</Text>
            <Text>Classe prevista: {classe_prevista}</Text>
            <Text>Probabilidade: {(probabilidade * 100).toFixed(2)}%</Text>
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
});

export default FinalScreen;
