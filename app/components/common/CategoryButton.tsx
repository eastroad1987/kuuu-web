import React from "react";
    
interface InputProps {
  title: string;
  color?: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function CategoryButton({ title, color = "#16213E", isActive = false, onClick }: InputProps) {
  return (
    <button
      id={`category-button-${title}`}
      style={{
        backgroundColor: isActive ? color : "#555",
        color: "#fff",
        width: "200px",
        height: "200px",
        textAlign: "center",
        padding: "10px 20px",
        borderRadius: "4px",
        fontSize: "14px",
        margin: "0 5px",
      }}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
