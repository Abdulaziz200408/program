import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "./img1.png";
import "./ex.css";

function Explent() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/"); // Home sahifasiga o'tish
    window.location.reload();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "white",
        height: "100vh",
        padding: "20px",
      }}
    >
      <h2
        style={{
          marginTop: "10px",
          marginBottom: "20px",
          textAlign: "center",
          fontSize: "32px",
          fontWeight: "bold",
          color: "#f5f5f5",
          width: "100%",
        }}
      >
        Saytni ishlatish bo'yicha qo'llanma
      </h2>
      <img
        style={{
          width: "79%",
          height: "89vh",
          objectFit: "cover",
          marginTop: "-10px",
          borderRadius: "10px",
          boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.3)",
        }}
        src={img1}
        alt="Qo'llanma rasmi"
      />
      <button
        onClick={handleContinue}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          fontSize: "18px",
          color: "#fff",
          backgroundColor: "#ff7b54",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        Davom etish
      </button>
    </div>
  );
}

export default Explent;
