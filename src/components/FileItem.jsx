import React from "react";

const FileItem = ({ name, size, path, progress, onRemove }) => {
    // função para formatar o tamanho do arquivo
    const formatBytes = (bytes) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    return (
        <div
            style={{
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                padding: "12px",
                marginBottom: "12px",
                backgroundColor: "#ffffff",
                position: "relative"
            }}
        >
            <div style={{ marginBottom: "8px" }}>
                <strong>{path || name}</strong>
            </div>
            <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>
                {formatBytes(size)}
            </div>

            {/* Barra de progresso */}
            <div style={{
                height: "8px",
                backgroundColor: "#e5e7eb",
                borderRadius: "4px",
                overflow: "hidden",
                marginBottom: "8px"
            }}>
                <div
                    style={{
                        width: `${progress}%`,
                        height: "100%",
                        backgroundColor: "#2563eb",
                        transition: "width 0.3s ease"
                    }}
                />
            </div>

            {/* Botão de remover */}
            <button
                onClick={onRemove}
                style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    background: "none",
                    border: "none",
                    color: "#ef4444",
                    fontSize: "18px",
                    cursor: "pointer"
                }}
                title="Remover arquivo"
            >
                ×
            </button>
        </div>
    );
};

export default FileItem;
