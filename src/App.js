import React from "react";
import Navbar from "./components/navbar";
import Order from "./components/order";
import "./App.css";
import { OrderContextProvider } from "./Context/OrderContext";
import { UiContextProvider } from "./Context/UiContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OrderSharedLayout from "./components/sharedLayout/OrderSharedLayout";
import Menu from "./components/menu";
import MenuSharedLayout from "./components/sharedLayout/MenuSharedLayout";
import { MenuContextProvider } from "./Context/MenuContext";
import SingleMenuDetail from "./components/menu/SingleMenuDetail";

const App = () => {
  return (
    <BrowserRouter>
      <UiContextProvider>
        <Routes>
          <Route path="/" element={<OrderSharedLayout />}>
            <Route
              index
              element={
                <OrderContextProvider>
                  <Order />
                </OrderContextProvider>
              }
            />
            <Route
              path="menu"
              element={
                <MenuContextProvider>
                  <MenuSharedLayout />
                </MenuContextProvider>
              }
            >
              <Route index element={<Menu />} />
              <Route path=":menuId" element={<SingleMenuDetail />} />
            </Route>
          </Route>
        </Routes>
      </UiContextProvider>
    </BrowserRouter>
  );
};

export default App;
