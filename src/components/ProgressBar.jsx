import api from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

const ProgressBar = ({ navigation }) => {
    const [progress, setProgress] = useState(0);
    const animatedProgress = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const intervalRef = useRef(null);

    useEffect(() => {
        const iniciarGeracao = async () => {
            try {
                await api.get('gerar-csv');
            } catch (error) {
                console.error('Erro ao iniciar geração do CSV:', error);
            }
        };
        iniciarGeracao();
    }, []);

    useEffect(() => {
        intervalRef.current = setInterval(async () => {
            try {
                const response = await api.get('progresso');
                const newProgress = Math.min(response.data?.valor ?? 0, 100);
                console.log('Progresso atualizado:', newProgress);
                setProgress(newProgress);

                if (newProgress >= 100) {
                    clearInterval(intervalRef.current);
                    navigation.navigate('ChooseParams');
                }
            } catch (error) {
                console.error('Erro ao buscar progresso:', error);
            }
        }, 2000);

        return () => clearInterval(intervalRef.current);
    }, []);

    useEffect(() => {
        Animated.timing(animatedProgress, {
            toValue: progress,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, [progress]);

    // Efeito Pulse no carregamento
    useEffect(() => {
        if (progress < 100) {
            const pulse = Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 0.6,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ])
            );
            pulse.start();
            return () => pulse.stop();
        }
    }, [progress]);

    const widthInterpolated = animatedProgress.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
        extrapolate: 'clamp',
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gerando CSV</Text>
            <View style={styles.progressBar}>
                <Animated.View
                    style={[
                        styles.progress,
                        {
                            width: widthInterpolated,
                            opacity: pulseAnim,
                        },
                    ]}
                />
            </View>
            <Text style={styles.percentage}>{progress}%</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    progressBar: {
        width: '100%',
        height: 20,
        backgroundColor: '#eee',
        borderRadius: 10,
        overflow: 'hidden',
    },
    progress: {
        height: '100%',
        backgroundColor: '#4caf50',
    },
    percentage: {
        marginTop: 10,
        fontSize: 16,
    },
});

export default ProgressBar;
