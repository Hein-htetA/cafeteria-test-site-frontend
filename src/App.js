import React from "react";
import Navbar from "./components/navbar/navbar";
import Order from "./components/order";
import "./App.css";
import { Container } from "@mui/material";

const App = () => {
  return (
    <div>
      <Navbar />
      <Order />
    </div>
  );
};

export default App;
