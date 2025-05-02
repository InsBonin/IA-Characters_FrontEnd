import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import api from '../services/api';

const PixelCollector = () => {
  const [imagesByCharacter, setImagesByCharacter] = useState({});
  const [characterList, setCharacterList] = useState([]);
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [liveColor, setLiveColor] = useState('rgb(255, 255, 255)');
  const [savedColor, setSavedColor] = useState(null);
  const [currentName, setCurrentName] = useState('');
  const [nameAttributes, setNameAttributes] = useState([]);
  const [rgbAttributes, setRgbAttributes] = useState([]);

  const [finalCharacterList, setFinalCharacterList] = useState([]);
  const [finalNameAttributes, setFinalNameAttributes] = useState([]);
  const [finalRgbAttributes, setFinalRgbAttributes] = useState([]);

  const [allAttributesSent, setAllAttributesSent] = useState(false);
  const [csvError, setCsvError] = useState('');
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);

  const animatedProgress = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const progressIntervalRef = useRef(null);

  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get('get-url-image');
        const data = response.data.sucesso;
        setImagesByCharacter(data);
        const characters = Object.keys(data);
        setCharacterList(characters);
        setImages(data[characters[0]]);
      } catch (err) {
        console.error('Erro ao conectar com a API:', err);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (!images[currentIndex]) return;
    const img = imageRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
    };
    img.src = images[currentIndex];
  }, [images, currentIndex]);

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
    } catch { }
  };

  const handleClick = () => {
    setSavedColor(liveColor);
  };

  const handleSaveAttribute = () => {
    if (!currentName || !savedColor) return;
    if (nameAttributes.length >= 3) return;
    setNameAttributes((prev) => [...prev, currentName]);
    setRgbAttributes((prev) => [...prev, savedColor]);
    setCurrentName('');
    setSavedColor(null);
  };

  const handleSendAttributes = async () => {
    const currentCharacter = characterList[currentCharacterIndex];
    const nextIndex = currentCharacterIndex + 1;

    setFinalCharacterList((prev) => [...prev, currentCharacter]);
    setFinalNameAttributes((prev) => [...prev, ...nameAttributes]);
    setFinalRgbAttributes((prev) => [
      ...prev,
      ...rgbAttributes.map((rgb) => rgb.replace(/[^\d,]/g, '')),
    ]);

    setNameAttributes([]);
    setRgbAttributes([]);

    if (nextIndex >= characterList.length) {
      const payload = {
        personagem: [...finalCharacterList, currentCharacter],
        atributos: [...finalNameAttributes, ...nameAttributes],
        rgb: [
          ...finalRgbAttributes,
          ...rgbAttributes.map((rgb) => rgb.replace(/[^\d,]/g, '')),
        ],
        numero_atributos: 3,
      };

      try {
        await api.post('atributos', payload);
        setAllAttributesSent(true);
      } catch (error) {
        console.error('Erro ao enviar atributos:', error);
      }
    } else {
      setCurrentCharacterIndex(nextIndex);
      setImages(imagesByCharacter[characterList[nextIndex]]);
      setCurrentIndex(0);
    }
  };

  const iniciarGeracaoCSV = () => {
    try {
      setShowProgress(true);

      // Dispara a geração do CSV sem bloquear
      api.get('gerar-csv').catch((err) => {
        console.error('Erro ao iniciar geração de CSV:', err);
        setCsvError('Erro ao iniciar a geração do CSV');
      });

      // Inicia o ping da rota de progresso
      progressIntervalRef.current = setInterval(async () => {
        try {
          const response = await api.get('progresso');
          const newProgress = Math.min(response.data?.valor ?? 0, 100);
          setProgress(newProgress);

          if (newProgress >= 100) {
            clearInterval(progressIntervalRef.current);

            // Aguarda 5 segundos antes de navegar
            setTimeout(() => {
              navigation.navigate('ChooseParams');
            }, 5000);
          }
        } catch (err) {
          console.error('Erro ao buscar progresso:', err);
        }
      }, 5000);
    } catch (err) {
      console.error('Erro inesperado ao iniciar geração de CSV:', err);
    }
  };



  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  useEffect(() => {
    if (progress < 100 && showProgress) {
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
  }, [progress, showProgress]);

  const widthInterpolated = animatedProgress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  return (
    <>
      {!allAttributesSent && (
        <Text style={styles.title}>
          Personagem: {characterList[currentCharacterIndex]}
        </Text>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {images.length > 0 && (
        <img
          ref={imageRef}
          alt="Imagem"
          style={{ width: 400, height: 300 }}
          onMouseMove={handleMouseMove}
          onClick={handleClick}
        />
      )}

      <View style={styles.navButtons}>
        <Button
          title="Anterior"
          onPress={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
          disabled={currentIndex === 0}
        />
        <Button
          title="Próxima"
          onPress={() =>
            setCurrentIndex((prev) => Math.min(prev + 1, images.length - 1))
          }
          disabled={currentIndex === images.length - 1}
        />
      </View>

      <View style={styles.colorBox}>
        <Text style={styles.label}>RGB Atual: {liveColor}</Text>
        {savedColor && (
          <Text style={styles.label}>RGB Salvo: {savedColor}</Text>
        )}

        <TextInput
          value={currentName}
          onChangeText={setCurrentName}
          placeholder="Nome do Atributo"
          editable={!allAttributesSent}
          style={styles.input}
        />

        <Button
          title="Salvar Atributo"
          onPress={handleSaveAttribute}
          disabled={allAttributesSent || nameAttributes.length >= 3}
        />

        {nameAttributes.length > 0 && (
          <View style={styles.attributesContainer}>
            <Text style={styles.subTitle}>Atributos Salvos:</Text>
            {nameAttributes.map((attr, i) => (
              <Text key={i}>
                {attr}: {rgbAttributes[i]}
              </Text>
            ))}
          </View>
        )}

        {!allAttributesSent && nameAttributes.length === 3 && (
          <Button title="Enviar Atributos" onPress={handleSendAttributes} />
        )}

        {allAttributesSent && !showProgress && (
          <Button title="Gerar CSV" onPress={iniciarGeracaoCSV} />
        )}

        {showProgress && (
          <View style={{ marginTop: 20, width: '100%' }}>
            <Text style={{ marginBottom: 8 }}>Gerando CSV: {progress}%</Text>
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
          </View>
        )}

        {csvError && <Text style={{ color: 'red' }}>{csvError}</Text>}
      </View>
    </>
  );
};

const styles = StyleSheet.create({

  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
  },
  colorBox: {
    marginTop: 20,
    padding: 16,
    width: '100%',
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 8,
    color: '#555',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 4,
    color: '#222',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#fff',
    color: '#000',
  },
  attributesContainer: {
    marginTop: 12,
    padding: 8,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
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
});

export default PixelCollector;
