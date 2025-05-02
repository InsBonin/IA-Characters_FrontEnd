import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import api from '../services/api';
import { font } from "../theme/fonts";

const ParamsCNN = ({ navigation }) => {
    const [camadas, setcamadas] = useState('');
    const [neuronios, setneuronios] = useState('');
    const [epocas, setepocas] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [acuracia, setAcuracia] = useState(null);

    const handleSubmit = async () => {
        if (!camadas || !neuronios || !epocas) {
            setError("Todos os campos devem ser preenchidos!");
            return;
        }

        setLoading(true);
        setError('');
        setAcuracia(null);

        try {
            const response = await api.post('cnn/parametros', {
                camadas: Number(camadas),
                neuronios: Number(neuronios),
                epocas: Number(epocas),
            });

            const { acuracia_validacao } = response.data;
            setAcuracia(acuracia_validacao);

            setTimeout(() => {
                navigation.navigate('ClassificarCNN');
            }, 5000);

        } catch (error) {
            console.error("Erro na requisição", error);
            setError("Houve um erro ao enviar os parâmetros. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    const isButtonDisabled = !(camadas && neuronios && epocas) || loading;
    const buttonText = camadas && neuronios && epocas ? 'Enviar Parâmetros' : 'Informe os parâmetros';
    const buttonStyle = isButtonDisabled ? { backgroundColor: '#ccc' } : { backgroundColor: '#007BFF' };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Hora de selecionar os parâmetros</Text>
                <Text style={styles.subtitle}>Você poderá definir até três quantidades de parâmetros!</Text>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Quantidade de Camadas</Text>
                <TextInput
                    value={camadas}
                    onChangeText={setcamadas}
                    placeholder="Ex: 4"
                    placeholderTextColor="#aaa"
                    style={styles.input}
                />
                <Text style={styles.secondLabel}>Quantidade de Neurônios</Text>
                <TextInput
                    value={neuronios}
                    onChangeText={setneuronios}
                    placeholder="Ex: 12"
                    placeholderTextColor="#aaa"
                    style={styles.input}
                />
                <Text style={styles.secondLabel}>Quantidade de Épocas</Text>
                <TextInput
                    value={epocas}
                    onChangeText={setepocas}
                    placeholder="Ex: 10"
                    placeholderTextColor="#aaa"
                    style={styles.input}
                />
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity
                style={[styles.button, buttonStyle]}
                onPress={handleSubmit}
                disabled={isButtonDisabled}
            >
                <Text style={styles.buttonText}>
                    {loading ? 'Enviando...' : buttonText}
                </Text>
            </TouchableOpacity>

            {acuracia !== null && (
                <Text style={styles.acuraciaText}>
                    Acurácia de Validação: {(acuracia * 100).toFixed(2)}%
                </Text>
            )}
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
        fontSize: '2.5rem',
    },
    subtitle: {
        fontFamily: font.regular,
        fontSize: '1rem',
        color: '#aaa'
    },
    inputContainer: {
        marginTop: '5%',
        width: '30%'
    },
    label: {
        fontFamily: font.regular,
        fontSize: '1.2rem',
        marginBottom: '1%'
    },
    secondLabel: {
        fontFamily: font.regular,
        fontSize: '1.2rem',
        marginBottom: '1%',
        marginTop: '5%'
    },
    input: {
        fontFamily: font.regular,
        fontSize: '1rem',
        borderWidth: .5,
        padding: '2%',
        borderRadius: 10,
        borderColor: '#aaa'
    },
    button: {
        marginTop: '5%',
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignItems: 'center',
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: '1.2rem',
    },
    errorText: {
        color: 'red',
        fontSize: '1rem',
        marginTop: '10px',
    },
    acuraciaText: {
        marginTop: 20,
        fontSize: '1.2rem',
        fontFamily: font.regular,
        color: '#28a745',
    }
});

export default ParamsCNN;
