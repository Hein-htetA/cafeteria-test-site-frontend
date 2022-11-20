import React from "react";
import Navbar from "./components/navbar";
import Order from "./components/order";
import "./App.css";
import { OrderContextProvider } from "./Context/OrderContext";
import { UiContextProvider } from "./Context/UiContext";

const App = () => {
  return (
    <UiContextProvider>
      <Navbar />
      <OrderContextProvider>
        <Order />
      </OrderContextProvider>
    </UiContextProvider>
  );
};

export default App;
