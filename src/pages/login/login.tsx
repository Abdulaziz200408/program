import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import "./login.css";
import Home from "../home/home";

interface UserData {
  name: string;
  role?: string; // role maydoni optional
}

function Login() {
  const [name, setName] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const savedName = localStorage.getItem("name");
    const savedAdmin = localStorage.getItem("admin");

    // Agar localStorage'da name mavjud bo'lsa, avtomatik tizimga kiritish
    if (savedName) {
      setIsLoggedIn(true);
      if (savedAdmin === "true") {
        setIsAdmin(true);
      }
    }
  }, []);

  const saveUserDataToAPI = async (userData: UserData) => {
    try {
      const response = await fetch("https://c0adcbfd27d5ecc2.mokky.dev/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`Xatolik: ${error.message}`);
      } else {
        toast.error("Noma'lum xatolik yuz berdi.");
      }
    }
  };

  const handleLogin = async () => {
    // Ismni tekshirish
    if (!name || name.length < 4 || !/^[A-Za-z]+$/.test(name)) {
      toast.error("Iltimos, ismingizni to'g'ri kiriting.");
      return;
    }

    let userData: UserData = {
      name: name,
    };

    // Ma'lumotlarni API'ga yuborish
    await saveUserDataToAPI(userData);
    setIsLoggedIn(true);
    localStorage.setItem("name", name);
    toast.success("Tizimga muvaffaqiyatli kirdingiz!");
  };

  return (
    <div>
      <ToastContainer />
      {isLoggedIn ? (
        <Home />
      ) : (
        <div className="login-container">
          {/* Dumaloq elementlar */}
          <div className="circle">JavaScript</div>
          <div className="circle">TypeScript</div>
          <div className="circle">React</div>
          <div className="circle">Next.js</div>
          <div className="circle">Vite</div>
          <div className="circle">SASS</div>
          <div className="circle">Node.js</div>
          <div className="circle">Python</div>
          <div className="circle">Go</div>

          <div className="login-box">
            <h2 className="login-title">Login</h2>

            <input
              type="text"
              placeholder="name"
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button className="submit-btn" type="button" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
