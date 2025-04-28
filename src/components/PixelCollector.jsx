import React, { useEffect, useRef, useState } from 'react';
import { Button, Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';

const { width } = Dimensions.get('window');

const PixelCollector = ({ characterName, imageUrl }) => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [liveColor, setLiveColor] = useState('rgb(255, 255, 255)');
    const [savedColor, setSavedColor] = useState(null); // Para armazenar a cor salva
    const [nameAttributes, setNameAttributes] = useState([]);  // Array para nomes dos atributos
    const [rgbAttributes, setRgbAttributes] = useState([]);    // Array para códigos RGB
    const [currentName, setCurrentName] = useState('');         // Nome do atributo a ser inserido

    const canvasRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const img = imageRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        img.crossOrigin = 'Anonymous';  // Garante que o canvas não seja tainted

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
        };
    }, []);

    const handleMouseMove = (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setCursorPosition({ x, y });

        const ctx = canvasRef.current.getContext('2d');
        try {
            const pixel = ctx.getImageData(x, y, 1, 1).data;
            const rgb = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
            setLiveColor(rgb);
        } catch (error) {
            //console.error('Erro ao acessar os dados da imagem:', error);
        }
    };

    const handleClick = () => {
        setSavedColor(liveColor); // Salva o RGB selecionado
    };

    const handleSaveAttribute = () => {
        if (currentName && savedColor) {
            // Adiciona o nome e o RGB aos arrays correspondentes
            setNameAttributes([...nameAttributes, currentName]);
            setRgbAttributes([...rgbAttributes, savedColor]);
            setCurrentName(''); // Limpa o campo de nome para o próximo atributo
            setSavedColor(null); // Limpa a cor salva
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.leftSide}>
                <View style={styles.imageContainer}>
                    <canvas ref={canvasRef} style={styles.hiddenCanvas} />
                    <img
                        ref={imageRef}
                        src={imageUrl}
                        alt="Imagem"
                        style={styles.image}
                        onMouseMove={handleMouseMove}
                        onClick={handleClick}  // Chama a função para salvar o RGB quando clica
                    />
                    {/* Cursor/Lupa */}
                    <View style={[
                        styles.cursor,
                        {
                            left: cursorPosition.x - 25,
                            top: cursorPosition.y - 25,
                            backgroundColor: liveColor,
                        }
                    ]} />
                </View>
            </View>

            <View style={styles.rightSide}>
                {/* Exibir os inputs para adicionar atributos */}
                <Text style={styles.label}>Nome do Atributo:</Text>
                <TextInput
                    style={styles.input}
                    value={currentName}
                    onChange={(e) => setCurrentName(e.target.value)}  // Atualiza o nome do atributo
                    placeholder="Digite o nome do atributo"
                />

                <Text style={styles.label}>Cor Selecionada:</Text>
                <TextInput
                    style={styles.input}
                    value={savedColor || liveColor}  // Mostra a cor salva ou a cor atual
                    editable={false}  // O RGB é somente visualizado e não pode ser editado
                />

                <Button title="Salvar Atributo" onPress={handleSaveAttribute} />

                {/* Exibir atributos salvos */}
                <View style={styles.attributesContainer}>
                    <Text style={styles.label}>Atributos Salvos:</Text>
                    {nameAttributes.length > 0 && nameAttributes.map((name, index) => (
                        <Text key={index}>{name}: {rgbAttributes[index]}</Text>
                    ))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flexDirection: 'row', flex: 1 },
    leftSide: { flex: 2, backgroundColor: '#eee', position: 'relative' },
    rightSide: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', padding: 20 },
    imageContainer: { width: '100%', height: 300, position: 'relative' },
    hiddenCanvas: { display: 'none' },
    image: { width: '100%', height: '100%', objectFit: 'cover' },
    cursor: { position: 'absolute', width: 50, height: 50, borderRadius: 25, borderWidth: 2, borderColor: '#000', opacity: 0.7, pointerEvents: 'none' },
    label: { fontSize: 18, marginBottom: 10 },
    input: { width: 150, height: 40, borderColor: '#ccc', borderWidth: 1, paddingHorizontal: 10, textAlign: 'center', fontSize: 16, marginBottom: 10 },
    attributesContainer: { marginTop: 20 },
});

export default PixelCollector;
