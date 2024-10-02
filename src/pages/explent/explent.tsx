import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "./immg1.png";
import img2 from "./2.png";
import img3 from "./3.png";
import "./ex.css";

function Explent() {
  const navigate = useNavigate(); // useNavigate dan foydalanamiz
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    {
      src: img1,
      desc: "Ushbu sahifa orqali siz yangi ma'lumotlarni qo'shishingiz mumkin. Nomi, Tavsif, Rasm URL, va Eslatma maydonlari orqali kerakli ma'lumotlarni kiritib, Codni qo'shish tugmasi orqali saqlashingiz mumkin.",
    },
    {
      src: img2,
      desc: "Bu menyudan siz kerakli dasturlash tilini tanlashingiz va ma'lumotlarni qidirishingiz mumkin. Java, React, Next.js kabi tillar bo'yicha ma'lumotlarni izlash uchun tezkor yo'llar mavjud.",
    },
    {
      src: img3,
      desc: "Bu bo'limda siz profil sozlamalarini boshqarishingiz va saytdan chiqishingiz mumkin. Profilning yuqori qismida chiqish tugmasi joylashgan.",
    },
  ];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleContinue = () => {
    navigate("/"); // Home sahifasiga o'tish
    window.location.reload();
  };

  return (
    <div className="slider-container">
      <h2>Saytni ishlatish bo'yicha qo'llanma</h2>

      <div className="slider">
        <button className="left-arrow" onClick={handlePrev}>
          &#10094;
        </button>

        <div className="slide">
          <img
            src={images[currentSlide].src}
            alt="Slider Image"
            className="slider-image"
          />
          <div className="text-overlay">
            <p className="image-description">{images[currentSlide].desc}</p>
          </div>
        </div>

        <button className="right-arrow" onClick={handleNext}>
          &#10095;
        </button>
      </div>

      <div className="button-container">
        <button onClick={handleContinue} className="continue-button">
          Davom etish
        </button>
      </div>
    </div>
  );
}

export default Explent;
