import React from "react";
import { Link } from "react-router-dom";
import "../home/home.css"; // CSS fayl yo'lini tekshiring

const Home = () => {
  const handleLogout = () => {
    // Logout funksiyasi
    console.log("Logged out");
    // Agar haqiqatan chiqish qilish kerak bo'lsa, qo'shimcha kod qo'shing
  };

  return (
    <nav className="navbar">
      <div className="logo">Logo</div>
      <ul className="nav-links">
        <li>
          <Link to="/java">Java</Link>
        </li>
        <li>
          <Link to="/cplus">C++</Link>
        </li>
        <li>
          <Link to="/html">HTML</Link>
        </li>
        <li>
          <Link to="/css">CSS</Link>
        </li>
        <li>
          <Link to="/scss">SCSS</Link> {/* Agar bu sahifa mavjud bo'lsa */}
        </li>
        <li>
          <Link to="/bootstrap">Bootstrap</Link>
        </li>
        <li>
          <Link to="/tailwind">Tailwind</Link>
        </li>
        <li>
          <Link to="/chakra">Chakra</Link> {/* Agar bu sahifa mavjud bo'lsa */}
        </li>
        <li>
          <Link to="/mui">MUI</Link>
        </li>
        <li>
          <Link to="/react">React</Link>
        </li>
        <li>
          <Link to="/nextjs">Next.js</Link>
        </li>
        <li>
          <Link to="/vuejs">Vue.js</Link>
        </li>
      </ul>
      <button className="logout-btn" type="button" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Home;
