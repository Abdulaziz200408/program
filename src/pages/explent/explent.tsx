import React from "react";
import { useNavigate } from "react-router-dom";
import img1 from "./img3.png";
import com from "./commit.png";
import img2 from "./2.png";
import img3 from "./3.png";
import "./ex.css";

function Explent() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="explent-container">
      <div
        style={{
          backgroundColor: "white",
          color: "black",
          borderRadius: "10px",
          padding: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
      >
        <img
          className="imgto"
          style={{
            width: "100%",
            height: "90px",
            objectFit: "cover",
          }}
          src={img2}
        />
        <p
          style={{
            fontSize: "17px",
            lineHeight: "22px",
            fontWeight: "500",
            margin: 0,
            maxWidth: "800px",
            marginTop: "5px",
          }}
        >
          <span
            style={{
              color: "red",
            }}
          >
            {" "}
            Bu menyudan{" "}
          </span>{" "}
          siz kerakli dasturlash tilini tanlashingiz va ma'lumotlarni
          qidirishingiz mumkin. Java React Next.js kabi tillar bo'yicha
          ma'lumotlarni izlash uchun tezkor yo'llar mavjud
        </p>
      </div>
      <div
        style={{
          marginTop: "25px",
          display: "flex",
        }}
        className="cards-container"
      >
        <div
          style={{
            display: "flex",
            alignItems: "start",
            backgroundColor: "white",
            color: "black",
            borderRadius: "10px",
            padding: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          <img
            className="imgto"
            style={{
              width: "400px",
              height: "500px",
              borderRadius: "10px",
            }}
            src={img1}
          />
          <p
            style={{
              marginTop: "50px",
              marginLeft: "30px",
              fontSize: "17px",
              lineHeight: "22px",
              fontWeight: "500",
              maxWidth: "300px",
            }}
          >
            Ushbu sahifa orqali siz yangi ma'lumotlarni qo'shishingiz mumkin.
            Nomi, Tavsif, Rasm URL, va Eslatma maydonlari orqali kerakli
            ma'lumotlarni kiritib, Codni qo'shish tugmasi orqali saqlashingiz
            mumkin
          </p>
        </div>

        <div>
          <div
            style={{
              backgroundColor: "white",
              color: "black",
              borderRadius: "10px",
              padding: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
              display: "flex",
              transition: "background-color 0.3s ease",
            }}
          >
            <img
              className="imgto"
              style={{
                borderRadius: "10px",
              }}
              src={img3}
            />
            <p
              style={{
                marginLeft: "30px",
                fontSize: "17px",
                lineHeight: "22px",
                fontWeight: "500",
                maxWidth: "300px",
              }}
            >
              Bu bo'limda siz profil sozlamalarini boshqarishingiz va saytdan
              chiqishingiz mumkin. Profilning yuqori qismida chiqish tugmasi
              joylashgan.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "white",
              color: "black",
              borderRadius: "10px",
              padding: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
              display: "flex",
              transition: "background-color 0.3s ease",
              marginTop: "25px",
            }}
          >
            <img
              className="imgto"
              style={{
                borderRadius: "10px",
                width: "400px",
                // height: "500px",
              }}
              src={com}
            />
            <p
              style={{
                marginLeft: "30px",
                fontSize: "17px",
                lineHeight: "22px",
                fontWeight: "500",
                maxWidth: "300px",
              }}
            >
              textni bacgroudni qizil qilish uchun textni (*) yulduzchani ichiga
              yozing misol uchun *salom*
            </p>
          </div>
          <button onClick={handleContinue} className="continue-button">
            Davom etish
          </button>
        </div>
      </div>
    </div>
  );
}

export default Explent;
