import React from "react";
import Navbar from "./components/navbar/navbar";
import Order from "./components/order";
import "./App.css";
import { AppContextProvider } from "./Context/context";

const App = () => {
  return (
    <AppContextProvider>
      <Navbar />
      <Order />
    </AppContextProvider>
  );
};

export default App;
