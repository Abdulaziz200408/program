import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../home/home.css"; // Ensure the correct path to your CSS file

const Home: React.FC = () => {
  const location = useLocation();
  const [activeMenuItem, setActiveMenuItem] = useState<string>(
    localStorage.getItem("activeMenu") || "/java"
  );

  useEffect(() => {
    setActiveMenuItem(location.pathname);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("name"); // Optionally remove name if desired
    localStorage.removeItem("activeMenu"); // Remove active menu item on logout
    console.log("Logged out");
  };

  const handleMenuClick = (path: string) => {
    setActiveMenuItem(path);
    localStorage.setItem("activeMenu", path);
  };

  const name = localStorage.getItem("name");

  return (
    <nav className="navbar">
      <div className="logo">Notepad code</div>
      <ul className="nav-links">
        <li>
          <Link
            to="/java"
            className={activeMenuItem === "/java" ? "active" : ""}
            onClick={() => handleMenuClick("/java")}
          >
            Java
          </Link>
        </li>
        <li>
          <Link
            to="/cplus"
            className={activeMenuItem === "/cplus" ? "active" : ""}
            onClick={() => handleMenuClick("/cplus")}
          >
            C++
          </Link>
        </li>
        <li>
          <Link
            to="/html"
            className={activeMenuItem === "/html" ? "active" : ""}
            onClick={() => handleMenuClick("/html")}
          >
            HTML
          </Link>
        </li>
        <li>
          <Link
            to="/css"
            className={activeMenuItem === "/css" ? "active" : ""}
            onClick={() => handleMenuClick("/css")}
          >
            CSS
          </Link>
        </li>

        <li>
          <Link
            to="/bootstrap"
            className={activeMenuItem === "/bootstrap" ? "active" : ""}
            onClick={() => handleMenuClick("/bootstrap")}
          >
            Bootstrap
          </Link>
        </li>
        <li>
          <Link
            to="/tailwind"
            className={activeMenuItem === "/tailwind" ? "active" : ""}
            onClick={() => handleMenuClick("/tailwind")}
          >
            Tailwind
          </Link>
        </li>
        <li>
          <Link
            to="/mui"
            className={activeMenuItem === "/mui" ? "active" : ""}
            onClick={() => handleMenuClick("/mui")}
          >
            MUI
          </Link>
        </li>
        <li>
          <Link
            to="/react"
            className={activeMenuItem === "/react" ? "active" : ""}
            onClick={() => handleMenuClick("/react")}
          >
            React
          </Link>
        </li>
        <li>
          <Link
            to="/nextjs"
            className={activeMenuItem === "/nextjs" ? "active" : ""}
            onClick={() => handleMenuClick("/nextjs")}
          >
            Next.js
          </Link>
        </li>
        <li>
          <Link
            to="/vuejs"
            className={activeMenuItem === "/vuejs" ? "active" : ""}
            onClick={() => handleMenuClick("/vuejs")}
          >
            Vue.js
          </Link>
        </li>
        <li>
          <Link
            to="/npm"
            className={activeMenuItem === "/npm" ? "active" : ""}
            onClick={() => handleMenuClick("/npm")}
          >
            Npm
          </Link>
        </li>
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
        />
        {name}
      </button>
    </nav>
  );
};

export default Home;
