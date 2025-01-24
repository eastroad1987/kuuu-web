import React from "react";
    
interface InputProps {
  title: string;
  isActive?: boolean;
}

export default function CategoryButton({ title, isActive = false }: InputProps) {
  return (
    <button
      style={{
        backgroundColor: isActive ? "#16213E" : "#555",
        color: "#fff",
        width: "200px",
        height: "200px",
        textAlign: "center",
        padding: "10px 20px",
        borderRadius: "4px",
        fontSize: "14px",
        margin: "0 5px",
      }}
    >
      {title}
    </button>
  );
}
