import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { font } from '../theme/fonts';

export default function HomeScreen({ navigation }) {
    const [showNewCards, setShowNewCards] = useState(false);
    const [showTestCards, setShowTestCards] = useState(false);

    const handleNovidadePress = () => {
        setShowNewCards(true);
        setShowTestCards(false);
    };

    const handleTestarPress = () => {
        setShowTestCards(true);
        setShowNewCards(false);
    };

    const handleCancel = () => {
        navigation.replace('Home');
    };

    return (
        <View style={styles.containerMain}>
            <View style={styles.containerTitle}>
                <Text style={styles.mainTitle}>O que você deseja fazer?</Text>

                {(showNewCards || showTestCards) && (
                    <TouchableOpacity style={styles.button} onPress={handleCancel}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.container}>
                {!showTestCards ? (
                    <TouchableOpacity style={styles.card} onPress={handleTestarPress}>
                        <Ionicons name="flask" size={80} color="#4A90E2" />
                        <Text style={styles.title}>Testar</Text>
                        <Text style={styles.description}>Continue de onde você parou<br />com os modelos que você treinou.</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.newCardsContainer}>
                        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ClassificarCNN')}>
                            <Text style={styles.titleIA}>Testar o Modelo Convolucional</Text>
                            <Text style={styles.descriptionIA}>Modelo que é treinado baseado em camadas.</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('UploadImage')}>
                            <Text style={styles.titleIA}>Testar a Extração de Pixels</Text>
                            <Text style={styles.descriptionIA}>Modelo treinado através de seleção de pixel.</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {!showNewCards ? (
                    <TouchableOpacity style={styles.card} onPress={handleNovidadePress}>
                        <Ionicons name="sparkles" size={80} color="#7D3C98" />
                        <Text style={styles.title}>Novidade</Text>
                        <Text style={styles.description}>Treine um novo modelo<br />selecionando entre duas opções.</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.newCardsContainer}>
                        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('CollectorZip')}>
                            <Text style={styles.titleIA}>Modelo Convolucional</Text>
                            <Text style={styles.descriptionIA}>Processa imagens em camadas para reconhecer padrões.</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('FolderCollector')}>
                            <Text style={styles.titleIA}>Extração de pixels</Text>
                            <Text style={styles.descriptionIA}>Análise detalhada de cada pixel para identificar personagens.</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerMain: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 20
    },

    containerTitle: {
        flexDirection: 'row',
        gap: 30,
    },

    container: {
        padding: 20,
        gap: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    card: {
        backgroundColor: '#F3F3F3',
        padding: 40,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        boxShadow: "0px 10px 25px -3px rgba(0,0,0,0.1)",
    },
    newCardsContainer: {
        flexDirection: 'column',
        gap: 20,
    },
    mainTitle: {
        fontFamily: font.bold,
        fontSize: '2.5rem',
        marginLeft: '30%'
    },
    title: {
        fontSize: '2rem',
        fontWeight: '600',
        marginTop: 10,
        fontFamily: font.medium
    },
    description: {
        fontSize: '2rem',
        color: '#555',
        marginTop: "2%",
        fontFamily: font.regular
    },
    titleIA: {
        fontSize: '1.5rem',
        fontFamily: font.medium,
    },
    descriptionIA: {
        fontSize: '1rem',
        color: '#555',
        marginTop: "2%",
        fontFamily: font.regular
    },
    button: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 20,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#bd0829',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#bd0829',
        fontSize: '1rem',
        fontFamily: font.regular
    },
});
