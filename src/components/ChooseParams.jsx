import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { font } from "../theme/fonts";

const ChooseParams = () => {
    const [firstParam, setFirstParam] = useState('');
    const [secondParam, setSecondParam] = useState('');
    const [thirdParam, setThirdParam] = useState('');

    return (
        <View>
            <View>
                <Text style={styles.title}>Hora de selecionar os parâmetros</Text>
                <Text style={styles.subtitle}>Você poderá definir até três quantidades de parâmetros!</Text>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Quantidade de Camadas</Text>
                <TextInput
                    value={firstParam}
                    onChangeText={setFirstParam}
                    placeholder="Ex: 4"
                    placeholderTextColor="#aaa"
                    style={styles.input}
                />
                <Text style={styles.secondLabel}>Quantidade de Neurônios</Text>
                <TextInput
                    value={secondParam}
                    onChangeText={setSecondParam}
                    placeholder="Ex: 12"
                    placeholderTextColor="#aaa"
                    style={styles.input}
                />
                <Text style={styles.secondLabel}>Qantidade de Épocas</Text>
                <TextInput
                    value={thirdParam}
                    onChangeText={setThirdParam}
                    placeholder="Ex: 10"
                    placeholderTextColor="#aaa"
                    style={styles.input}
                />
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Enviar Parâmetros</Text>
            </TouchableOpacity>
        </View>

    );
};

const styles = StyleSheet.create({
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
        marginTop: '10%'
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
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignItems: 'center',
        borderRadius: 8,
    },
    buttonText: {
      color: '#fff',
      fontSize: '1.2rem',
    },
});

export default ChooseParams;