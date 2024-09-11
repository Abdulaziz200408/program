import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import "./login.css";
import Menu from "../home/home"; // Ensure the path to Menu is correct

function Login() {
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const savedname = localStorage.getItem("name");
    const savedPassword = localStorage.getItem("password");
    if (savedname && savedPassword) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    if (name.length > 0 && password === "1234") {
      localStorage.setItem("name", name);
      localStorage.setItem("password", password);
      setIsLoggedIn(true);
    } else {
      toast.error("name yoki parol noto'g'ri", {
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
        <>
          <Menu />
        </>
      ) : (
        <div className="login-container">
          <div className="login-box">
            <h2 className="login-title">Login</h2>

            <input
              type="name"
              placeholder="name"
              className="input-field"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              style={{
                marginTop: "10px",
              }}
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
