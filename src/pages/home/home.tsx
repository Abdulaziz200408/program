import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Drawer, Button } from "antd"; // Ant Design kutubxonasidan foydalanamiz
import "../home/home.css"; // CSS faylini to‘g‘ri yo‘l bilan ta'minlang

const Home: React.FC = () => {
  const location = useLocation();
  const [activeMenuItem, setActiveMenuItem] = useState<string>(
    localStorage.getItem("activeMenu") || "/java"
  );
  const [visible, setVisible] = useState(false);
  const [userData, setUserData] = useState<any[]>([]); // Foydalanuvchi ma'lumotlari uchun

  useEffect(() => {
    setActiveMenuItem(location.pathname);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("name");
    localStorage.removeItem("activeMenu");
    console.log("Logged out");
  };

  const handleMenuClick = (path: string) => {
    setActiveMenuItem(path);
    localStorage.setItem("activeMenu", path);
  };

  const name = localStorage.getItem("name");

  // Drawer ochish
  const showDrawer = () => {
    setVisible(true);
    fetchUserData(); // Foydalanuvchi ma'lumotlarini olish
  };

  // API dan foydalanuvchi ma'lumotlarini olish
  const fetchUserData = async () => {
    try {
      const response = await fetch("https://6d548820c3f18dbd.mokky.dev/users");
      const data = await response.json();
      setUserData(data); // Olingan ma'lumotlarni saqlash
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const closeDrawer = () => {
    setVisible(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">Notepad code</div>
        <ul className="nav-links">
          {[
            "/java",
            "/cplus",
            "/html",
            "/css",
            "/bootstrap",
            "/react",
            "/nextjs",
            "/vuejs",
            "/npm",
            "/vedio",
            "/all",
            "/figma",
          ].map((path) => (
            <li key={path}>
              <Link
                to={path}
                className={activeMenuItem === path ? "active" : ""}
                onClick={() => handleMenuClick(path)}
              >
                {path.substring(1).charAt(0).toUpperCase() + path.slice(2)}{" "}
                {/* To'g'ri formatlash */}
              </Link>
            </li>
          ))}
        </ul>
        <button className="buttonhj" type="button" onClick={handleLogout}>
          <img
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              marginLeft: "5px",
            }}
            src="https://wallpapers.com/images/hd/anime-boy-in-black-and-white-anime-pfp-sefsf1g02629xu37.jpg"
            alt=""
            onClick={() => {
              if (localStorage.getItem("role") === "admin") {
                showDrawer(); // Agar admin bo'lsa, drawer ochish
              }
            }}
          />
          {name}
        </button>
      </nav>

      {/* Drawer komponenti */}
      <Drawer
        title="User Information"
        placement="right"
        onClose={closeDrawer}
        visible={visible}
      >
        {userData.length > 0 ? (
          userData.map((user) => (
            <div key={user.id}>
              <h3>Name: {user.name}</h3>
              <h3>ID: {user.id}</h3>
              <hr />
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </Drawer>
    </>
  );
};

export default Home;
