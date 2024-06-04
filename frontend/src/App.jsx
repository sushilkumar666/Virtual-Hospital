import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import { login, logout } from "./store/authSlice";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
