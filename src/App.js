import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Favourites from "./components/Favourites";
import ImageList from "./components/ImageList";
import Navbar from "./components/UI/Navbar";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./styles/globals.scss";

function App() {
  console.log("APP.JS RERENDERED ");
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<ImageList />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/favourites" element={<Favourites />} />
      </Routes>
    </div>
  );
}

export default App;
