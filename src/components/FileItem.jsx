import { Ionicons } from '@expo/vector-icons';
import React from "react";
import { font } from "../theme/fonts";

const FileItem = ({ name, size, path, progress, onRemove }) => {
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
                borderRadius: "12px",
                padding: "1% 5%",
                marginBottom: "2%",
                backgroundColor: "#ffffff",
                position: "relative",
                boxShadow: "0px 10px 25px -3px rgba(0,0,0,0.1)"
            }}
        >
            <div style={{ marginBottom: "8px", fontFamily: font.regular }}>
                <strong>{path || name}</strong>
            </div>
            <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>
                {formatBytes(size)}
            </div>

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

            <button
                onClick={onRemove}
                style={{
                    position: "absolute",
                    top: "12px",
                    right: "5%",
                    background: "none",
                    border: "none",
                    fontSize: "18px",
                    cursor: "pointer"
                }}
                title="Remover arquivo"
            >
                <Ionicons style={{ color: "#ef4444" }} name="trash-outline" size={30} />
            </button>
        </div>
    );
};

export default FileItem;
