import React, { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

const PixelCollector = ({ characterName, imageUrl }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [liveColor, setLiveColor] = useState('rgb(255, 255, 255)');
  const [savedColor, setSavedColor] = useState(null);
  const [nameAttributes, setNameAttributes] = useState([]);
  const [rgbAttributes, setRgbAttributes] = useState([]);
  const [currentName, setCurrentName] = useState('');

  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const img = imageRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    img.crossOrigin = 'Anonymous';

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
      // Silencioso
    }
  };

  const handleClick = () => {
    setSavedColor(liveColor);
  };

  const handleSaveAttribute = () => {
    if (currentName && savedColor) {
      setNameAttributes([...nameAttributes, currentName]);
      setRgbAttributes([...rgbAttributes, savedColor]);
      setCurrentName('');
      setSavedColor(null);
    }
  };

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        {/* Lado da imagem */}
        <View style={styles.imageWrapper}>
          <canvas ref={canvasRef} style={styles.hiddenCanvas} />
          <img
            ref={imageRef}
            src={imageUrl}
            alt="Imagem"
            style={styles.image}
            onMouseMove={handleMouseMove}
            onClick={handleClick}
          />
          <View
            style={[
              styles.cursor,
              {
                left: cursorPosition.x - 25,
                top: cursorPosition.y - 25,
                backgroundColor: liveColor,
              },
            ]}
          />
        </View>

        {/* Lado direito - cor selecionada */}
        <View style={styles.colorBox}>
          <Text style={styles.title}>Colors</Text>
          <View style={styles.colorInfo}>
            <Text style={styles.label}>RGB:</Text>
            <Text style={styles.value}>{liveColor}</Text>
          </View>
          {savedColor && (
            <View style={styles.colorInfo}>
              <Text style={styles.label}>Saved:</Text>
              <Text style={styles.value}>{savedColor}</Text>
            </View>
          )}

          {/* Inputs e botão */}
          <Text style={styles.subTitle}>Nome do Atributo:</Text>
          <TextInput
            value={currentName}
            onChangeText={setCurrentName}
            placeholder="Ex: Olhos"
            style={styles.input}
          />
          <Button title="Salvar Atributo" onPress={handleSaveAttribute} />

          {nameAttributes.length > 0 && (
            <View style={styles.attributesContainer}>
              <Text style={styles.subTitle}>Atributos Salvos:</Text>
              {nameAttributes.map((name, index) => (
                <Text key={index}>{name}: {rgbAttributes[index]}</Text>
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center',
  },
  imageWrapper: {
    position: 'relative',
    width: 500,
    height: 300,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  hiddenCanvas: {
    display: 'none',
  },
  cursor: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#000',
    opacity: 0.7,
    pointerEvents: 'none',
  },
  colorBox: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 10,
    minWidth: 240,
    maxWidth: 280,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
  },
  subTitle: {
    marginTop: 16,
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 8,
  },
  colorInfo: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  label: {
    fontWeight: '600',
    marginRight: 6,
  },
  value: {
    fontFamily: 'monospace',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    borderRadius: 6,
    marginBottom: 10,
  },
  attributesContainer: {
    marginTop: 12,
  },
});

export default PixelCollector;
