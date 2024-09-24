import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import "./login.css";
import Menu from "../home/home"; // Menu uchun to‘g‘ri yo‘lni ta'minlang

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem("name");
    const savedPassword = localStorage.getItem("password");
    // Agar localStorage'da name va password mavjud bo'lsa, avtomatik tizimga kiritish
    if (savedName && savedPassword) {
      setIsLoggedIn(true);
    }
  }, []);

  // Foydalanuvchi nomini tekshirish
  const validateName = (name: string) => {
    const nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(name);
  };

  const handleLogin = async () => {
    if (!validateName(name)) {
      toast.error(
        "Foydalanuvchi ismi faqat harflardan iborat bo‘lishi kerak.",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      return;
    }

    if (name.length > 0 && password === "2004") {
      localStorage.setItem("name", name);
      localStorage.setItem("password", password);
      localStorage.setItem("role", "user"); // Foydalanuvchi sifatida saqlash

      // Foydalanuvchi ma'lumotlarini API ga jo'natish
      try {
        const response = await fetch(
          "https://6d548820c3f18dbd.mokky.dev/users",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, password }),
          }
        );

        if (response.ok) {
          // Ro'yxatdan o'tgandan so'ng ma'lumotlarni saqlash
          localStorage.setItem("name", name);
          localStorage.setItem("password", password);
          setIsLoggedIn(true);
          toast.success("Ro'yxatdan muvaffaqiyatli o'tdingiz!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          throw new Error("Ro'yxatdan o'tishda xatolik yuz berdi.");
        }
      } catch (error: unknown) {
        // 'error' obyektini tiplash va xabarni chiqarish
        if (error instanceof Error) {
          toast.error(error.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error("Noma'lum xatolik yuz berdi.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    } else if (name.length > 0 && password === "ican") {
      localStorage.setItem("name", name);
      localStorage.setItem("password", password);
      localStorage.setItem("role", "admin"); // Admin sifatida saqlash
      setIsLoggedIn(true);
      toast.success("Ro'yxatdan muvaffaqiyatli o'tdingiz!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("Foydalanuvchi ismi yoki parol noto'g'ri", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div>
      <ToastContainer />
      {isLoggedIn ? (
        <Menu />
      ) : (
        <div className="login-container">
          <div className="login-box">
            <h2 className="login-title">Notepad Code Login</h2>

            <input
              type="text"
              placeholder="name"
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              style={{ marginTop: "10px" }}
              className="submit-btn"
              type="button"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
