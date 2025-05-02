import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from "react";
import FileItem from '../components/FileItem';
import api from '../services/api';

const ClassificarCNN = ({ navigation }) => {
    const inputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleButtonClick = () => {
        inputRef.current?.click();
    };

    const handleFileSelected = (event) => {
        const selectedFile = event.target.files[0];

        if (!selectedFile) return;

        const isValidImage = ['image/jpeg', 'image/png', 'image/jpg'].includes(selectedFile.type);

        if (!isValidImage) {
            alert('Formato inválido. Apenas JPG, JPEG e PNG são permitidos.');
            return;
        }

        setFile({ file: selectedFile, progress: 0 });

        simulateUpload();
    };

    const simulateUpload = () => {
        let current = 0;
        const interval = setInterval(() => {
            current += Math.random() * 20;
            if (current >= 100) {
                current = 100;
                clearInterval(interval);
            }
            setProgress(current);
        }, 300);
    };

    const handleSend = async () => {
        if (!file || progress < 100) return;

        const formData = new FormData();
        formData.append('imagem', file.file); // << nome do campo conforme o Postman

        try {
            const response = await api.post('cnn/classificar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                // Extração correta dos dados antes de usar
                const { classe_prevista, probabilidade } = response.data;

                navigation.navigate('FinalScreen', {
                    classe_prevista,
                    probabilidade
                });
            } else {
                console.error('Erro ao enviar:', response.statusText);
            }
        } catch (err) {
            console.error('Erro ao enviar:', err);
        }
    };



    const handleRemoveFile = () => {
        setFile(null);
        setProgress(0);
    };


    return (
        <div style={{ padding: '10%' }}>
            {!file ? (
                <div
                    onClick={handleButtonClick}
                    style={{
                        border: "2px dashed #2563eb",
                        padding: "5%",
                        borderRadius: "12px",
                        textAlign: "center",
                        cursor: "pointer",
                        backgroundColor: "#f9fafb"
                    }}
                >
                    <Ionicons name="image-outline" size={64} />
                    <p style={{ fontFamily: 'Poppins_400Regular', fontSize: '1.5rem' }}>Enviar imagem</p>
                    <input
                        ref={inputRef}
                        type="file"
                        style={{ display: "none" }}
                        accept=".jpg,.jpeg,.png"
                        onChange={handleFileSelected}
                    />
                </div>
            ) : (
                <FileItem
                    name={file.file.name}
                    size={file.file.size}
                    progress={progress}
                    onRemove={handleRemoveFile}
                />
            )}

            {file && progress >= 100 && (
                <button
                    onClick={handleSend}
                    style={{
                        marginTop: 24,
                        width: "100%",
                        backgroundColor: "#2563eb",
                        color: "white",
                        padding: "16px",
                        borderRadius: "8px",
                        border: "none",
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        cursor: "pointer"
                    }}
                >
                    Enviar
                </button>
            )}
        </div>
    );
};

export default ClassificarCNN;
