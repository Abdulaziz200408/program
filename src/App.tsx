import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./pages/home/home"; // Navbar joylashgan joy
import HtmlPage from "./pages/htmlb/html";
import CssPage from "./pages/css/css";
import MuiPage from "./pages/mui/mui";
import ReactPage from "./pages/react/react";
import NextjsPage from "./pages/nextjs/next";
import Login from "./pages/login/login";
import BootstrapPage from "./pages/bootstarp/bootstrap.";
import TailwindPage from "./pages/tailwend/tailwend";
import VuejsPage from "./pages/veujs/veujs";
import Java from "./pages/java/java";
import Cplus from "./pages/c++/c++";
import Npm from "./pages/npm/npm";
import Vedio from "./pages/vedioDarslilar";
import Figma from "./pages/figma/figma";
import All from "./pages/All/all";
import Projects from "./pages/Projects/projects";
import Sshap from "./pages/sshap/ashap";
import Explent from "./pages/explent/explent";

function App() {
  const isLoggedIn = !!localStorage.getItem("name"); // Foydalanuvchi login qilinganligini aniqlash

  return (
    <Router>
      <div>
        {/* Navbar faqat foydalanuvchi login qilganida ko'rinadi */}
        {isLoggedIn && <Navbar />}

        <Routes>
          {/* Agar foydalanuvchi login qilgan bo'lsa, "Explent" sahifasini ko'rsatamiz */}
          {!isLoggedIn ? (
            <Route path="/login" element={<Login />} />
          ) : (
            <Route path="/explent" element={<Explent />} />
          )}
          <Route path="/html" element={<HtmlPage />} />
          <Route path="/css" element={<CssPage />} />
          <Route path="/bootstrap" element={<BootstrapPage />} />
          <Route path="/tailwind" element={<TailwindPage />} />
          <Route path="/mui" element={<MuiPage />} />
          <Route path="/react" element={<ReactPage />} />
          <Route path="/nextjs" element={<NextjsPage />} />
          <Route path="/vuejs" element={<VuejsPage />} />
          <Route path="/java" element={<Java />} />
          <Route path="/cplus" element={<Cplus />} />
          <Route path="/npm" element={<Npm />} />
          <Route path="/vedio" element={<Vedio />} />
          <Route path="/figma" element={<Figma />} />
          <Route path="/barchasi" element={<All />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/sshap" element={<Sshap />} />
          <Route
            path="/"
            element={isLoggedIn ? <HtmlPage /> : <Login />}
          />{" "}
          {/* Default sahifa */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
