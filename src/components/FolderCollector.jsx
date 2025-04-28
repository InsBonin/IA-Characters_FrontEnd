import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from "react";
import { font } from "../theme/fonts";
import FileItem from "./FileItem";

const FolderCollector = () => {
    const inputRef = useRef(null);
    const [files, setFiles] = useState([]);
    const [link, setLink] = useState("");

    const handleButtonClick = () => {
        inputRef.current?.click();
    };

    const handleFilesSelected = (event) => {
        const selectedFiles = Array.from(event.target.files).map(file => ({
            file,
            progress: 0,
            path: file.webkitRelativePath || file.name // pega o caminho ou só o nome se não tiver
        }));

        selectedFiles.forEach((fileObj, index) => {
            simulateUpload(fileObj, index + files.length); // Corrige o index para o array completo
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

    return (
        <div style={{ padding: '10%' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '2%'}}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '10%' }}>
                    <Ionicons name="folder-open-outline" size={80} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h2 style={{ textAlign: "start", fontFamily: font.regular, display: 'flex', alignItems: 'center', margin: '0', fontSize: '2rem' }}>Importar arquivos</h2>
                    <h2 style={{ textAlign: "start", fontFamily: font.regular, display: 'flex', alignItems: 'center', margin: '0', fontSize: '1rem', opacity: .5 }}>Selecione uma pasta para importar</h2>
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
                <p style={{ fontFamily: 'Poppins_400Regular' }}>Arraste os arquivos aqui</p>
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
                    webkitdirectory="true"
                    directory=""
                    multiple
                    accept=".zip,*"
                />
            </div>

            {/* Lista de arquivos */}
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

            {/* Campo para link */}
            <div style={{ marginBottom: "24px" }}>
                <input
                    type="text"
                    placeholder="Ou insira um link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #d1d5db"
                    }}
                />
                <button
                    style={{
                        marginTop: "8px",
                        width: "100%",
                        backgroundColor: "#10b981",
                        color: "white",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "none",
                        cursor: "pointer"
                    }}
                    onClick={() => alert(`Link enviado: ${link}`)}
                >
                    Upload Link
                </button>
            </div>

            {/* Botão final */}
            <button
                style={{
                    width: "100%",
                    backgroundColor: "#2563eb",
                    color: "white",
                    padding: "16px",
                    borderRadius: "8px",
                    border: "none",
                    fontSize: "16px",
                    fontWeight: "bold",
                    cursor: "pointer"
                }}
                onClick={() => alert(`Importando ${files.length} arquivos e link: ${link}`)}
            >
                Importar Arquivos
            </button>
        </div>
    );
};

export default FolderCollector;
