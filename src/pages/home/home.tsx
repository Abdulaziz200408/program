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
            "/Barchasi",
            "/figma",
          ].map((path) => (
            <li key={path}>
              <Link
                to={path}
                className={activeMenuItem === path ? "active" : ""}
                onClick={() => handleMenuClick(path)}
              >
                {path.substring(1).charAt(0).toUpperCase() + path.slice(2)}{" "}
              </Link>
            </li>
          ))}
        </ul>
        <button className="buttonhj" type="button">
          <img
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              marginLeft: "5px",
            }}
            src="https://i.pinimg.com/736x/db/74/72/db7472f8861342037374fc928a201781.jpg"
            alt="User Avatar"
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
        width={400} // Drawer kengligini o'zgartirish
      >
        {userData.length > 0 ? (
          userData.map((user) => (
            <div key={user.id} className="user-card">
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
