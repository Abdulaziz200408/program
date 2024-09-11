import React, { useState, useEffect } from "react";
import "./login.css";
import Menu from "../home/home"; // Import yo'lini tekshiring

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Kirishni tekshirish uchun holat qo'shildi

  useEffect(() => {
    // LocalStorage'dan foydalanuvchi holatini tekshirish
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    if (savedEmail && savedPassword) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    // Email va parolni to'g'ri tekshirish
    if (email.length > 0 && password === "1234") {
      localStorage.setItem("email", email); // Emailni localStorage'ga saqlash
      localStorage.setItem("password", password); // Parolni localStorage'ga saqlash
      setIsLoggedIn(true); // Kirishni amalga oshirganini belgilash
    } else {
      alert("Email yoki parol noto'g'ri"); // Hato xabari
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("email"); // LocalStorage'dan emailni o'chirish
    localStorage.removeItem("password"); // LocalStorage'dan parolni o'chirish
    setEmail("");
    setPassword("");
    setIsLoggedIn(false); // Logout qilishda holatni yangilash
  };

  return (
    <div className="container ">
      {isLoggedIn ? (
        <>
          <Menu />
          <button className="logout-btn" type="button" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <div className="login-container">
          <div className="login-box">
            <button className="close-btn" type="button">
              X
            </button>
            <h2 className="login-title">Login</h2>

            <input
              type="email"
              placeholder="Email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="login-options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
            </div>

            <button className="submit-btn" type="button" onClick={handleLogin}>
              Login
            </button>

            <div className="register-link">
              Don't have an account? <a href="#">Register</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
