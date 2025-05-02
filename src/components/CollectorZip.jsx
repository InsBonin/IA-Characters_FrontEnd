import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from "react";
import api from '../services/api';
import { font } from "../theme/fonts";
import FileItem from "./FileItem";

const CollectorZip = ({ navigation }) => {
    const inputRef = useRef(null);
    const [files, setFiles] = useState([]);
    const [isSending, setIsSending] = useState(false);
    const [inputPorcentage, setInputPorcentage] = useState('');
    const isUploading = files.some(file => file.progress < 100);
    const isReadyToSend = files.length > 0 && files.every(file => file.progress === 100);

    const handleButtonClick = () => {
        inputRef.current?.click();
    };

    const handleFilesSelected = (event) => {
        const selectedFiles = Array.from(event.target.files).map(file => ({
            file,
            progress: 0,
        }));

        selectedFiles.forEach((fileObj, index) => {
            simulateUpload(fileObj, index + files.length);
        });

        setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
    };

    const simulateUpload = (fileObj, index) => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 20;

            setFiles(prevFiles => {
                const newFiles = [...prevFiles];
                if (newFiles[index]) {
                    newFiles[index].progress = Math.min(progress, 100);
                }
                return newFiles;
            });

            if (progress >= 100) {
                clearInterval(interval);
            }
        }, 300);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFiles = Array.from(event.dataTransfer.files).map(file => ({
            file,
            progress: 0,
            path: file.webkitRelativePath || file.name
        }));

        droppedFiles.forEach((fileObj, index) => {
            simulateUpload(fileObj, files.length + index);
        });

        setFiles(prevFiles => [...prevFiles, ...droppedFiles]);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleRemoveFile = (index) => {
        setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        if (isSending) return;

        setIsSending(true);

        const formData = new FormData();

        if (files.length > 0) {
            formData.append('arquivo', files[0].file);
        } else {
            alert('Nenhum arquivo selecionado.');
            setIsSending(false);
            return;
        }

        if (!inputPorcentage || isNaN(inputPorcentage)) {
            alert('Porcentagem inválida.');
            setIsSending(false);
            return;
        }

        formData.append('porcentagem_teste', inputPorcentage);

        try {
            const response = await api.post('cnn/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.status === 200) {
                alert('Arquivo enviado com sucesso!');
                navigation.navigate('ParamsCNN');
            } else {
                alert('Erro ao enviar arquivo.');
            }
        } catch (error) {
            console.error('Erro ao enviar arquivo:', error);
            alert('Erro ao enviar arquivo.');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div style={{ padding: '10%' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '2%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '10%' }}>
                    <Ionicons name="folder-open-outline" size={80} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h2 style={{ textAlign: "start", fontFamily: font.regular, margin: '0', fontSize: '2rem' }}>
                        Importar arquivos
                    </h2>
                    <h2 style={{ textAlign: "start", fontFamily: font.regular, margin: '0', fontSize: '1rem', opacity: .5 }}>
                        Selecione uma pasta para importar
                    </h2>
                </div>
            </div>

            <div
                onClick={handleButtonClick}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{
                    border: "2px dashed #2563eb",
                    padding: "5%",
                    borderRadius: "12px",
                    textAlign: "center",
                    cursor: "pointer",
                    marginBottom: "24px",
                    backgroundColor: "#f9fafb"
                }}
            >
                <p style={{ fontFamily: 'Poppins_400Regular', fontSize: '2rem', margin: 0 }}>Arraste os arquivos aqui</p>
                <p style={{ fontFamily: 'Poppins_400Regular' }}>Ou clique para importar</p>
                <button
                    style={{
                        marginTop: "12px",
                        padding: "8px 16px",
                        backgroundColor: "#FFFF",
                        color: "rgb(174, 174, 174)",
                        border: "1px solid rgb(223, 223, 223)",
                        borderRadius: "8px",
                        cursor: "pointer"
                    }}
                >
                    Selecionar Arquivos
                </button>

                <input
                    ref={inputRef}
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFilesSelected}
                    multiple
                    accept=".zip, .rar,*"
                />
            </div>

            {files.length > 0 && (
                <div style={{ marginBottom: "24px" }}>
                    {files.map((fileObj, index) => (
                        <FileItem
                            key={index}
                            name={fileObj.file.name}
                            size={fileObj.file.size}
                            path={fileObj.path}
                            progress={fileObj.progress}
                            onRemove={() => handleRemoveFile(index)}
                        />
                    ))}
                </div>
            )}

            <div style={{ marginBottom: "24px" }}>
                <label htmlFor="porcentagem" style={{ display: 'block', marginBottom: '8px', fontSize: '1rem', fontFamily: font.bold }}>
                    Porcentagem para teste:
                </label>
                <input
                    type="number"
                    id="porcentagem"
                    value={inputPorcentage}
                    onChange={(e) => setInputPorcentage(e.target.value)}
                    placeholder="Exemplo: 20"
                    style={{
                        width: "98%",
                        padding: "12px",
                        fontSize: "1rem",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                    }}
                    min="0"
                    max="100"
                />
            </div>

            <button
                disabled={!isReadyToSend || isSending}
                onClick={handleSubmit}
                style={{
                    width: "100%",
                    backgroundColor: (!isReadyToSend || isSending) ? "#94a3b8" : "#2563eb",
                    color: "white",
                    padding: "20px",
                    borderRadius: "8px",
                    border: "none",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    cursor: (!isReadyToSend || isSending) ? "not-allowed" : "pointer",
                    opacity: (!isReadyToSend || isSending) ? 0.6 : 1,
                }}
            >
                {isSending
                    ? 'Enviando...'
                    : isUploading
                        ? 'Carregando arquivos...'
                        : !isReadyToSend
                            ? 'Faça upload de um arquivo'
                            : 'Importar Arquivos'}
            </button>
        </div>
    );
};

export default CollectorZip;
