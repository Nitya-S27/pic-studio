import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Favourites from "./components/Favourites";
import ImageList from "./components/ImageList";
import Navbar from "./components/UI/Navbar";
import { Rings } from "react-loader-spinner";
import "./styles/globals.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/UI/Footer";

function App() {
  console.log("APP.JS RERENDERED ");

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => {
      clearTimeout();
    };
  }, []);

  const loaderStyle = {
    display: "flex",
    width: "100vw",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <>
      {isLoading ? (
        <div style={loaderStyle}>
          <Rings color="#da0037" height={80} width={80} />
        </div>
      ) : (
        <div>
          <Navbar />
          <Routes>
            <Route exact="true" path="/" element={<ImageList />} />
            <Route exact="true" path="/login" element={<Login />} />
            <Route exact="true" path="/signup" element={<SignUp />} />
            <Route exact="true" path="/favourites" element={<Favourites />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
