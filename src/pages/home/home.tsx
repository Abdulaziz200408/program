import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Drawer } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs"; // Dot ikonasini import qilamiz
import "../home/home.css"; // CSS faylini to‘g‘ri yo‘l bilan ta'minlang

const Home: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeMenuItem, setActiveMenuItem] = useState<string>(
    localStorage.getItem("activeMenu") || "/java"
  );
  const [open, setOpen] = useState(false); // Drawer uchun state
  const [menuVisible, setMenuVisible] = useState(false); // Dot menyusi uchun state
  const [userData, setUserData] = useState<any[]>([]);

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
    setOpen(true);
    fetchUserData(); // Foydalanuvchi ma'lumotlarini olish
  };

  // API dan foydalanuvchi ma'lumotlarini olish
  const fetchUserData = async () => {
    try {
      const response = await fetch("https://c0adcbfd27d5ecc2.mokky.dev/user");
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  // Logout funksiyasi
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
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

        {/* Foydalanuvchi rasmi, ismi va dot ikona */}
        <div className="profile-container">
          <img
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              cursor: "pointer",
              objectFit: "cover",
              marginLeft: "10px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              transition: "box-shadow 0.3s ease",
              backgroundColor: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="avatar-img"
            src="https://i.pinimg.com/736x/db/74/72/db7472f8861342037374fc928a201781.jpg"
            alt="User Avatar"
            onClick={() => {
              if (localStorage.getItem("role") === "admin") {
                showDrawer(); // Admin bo'lsa, drawer ochish
              }
            }}
          />
          <BsThreeDotsVertical
            className="dot-icon"
            onClick={() => setMenuVisible(!menuVisible)}
          />
          {menuVisible && (
            <div className="dropdown-menu">
              <p>{name}</p>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Drawer */}
      <Drawer
        title="User Information"
        placement="right"
        onClose={closeDrawer}
        open={open}
        width={400}
      >
        <h3>Name: {name}</h3> {/* Foydalanuvchi ismi */}
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </Drawer>
    </>
  );
};

export default Home;
