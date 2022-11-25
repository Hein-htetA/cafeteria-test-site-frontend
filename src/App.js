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
import RecycleBin from "./components/recyclebin";
import History from "./components/history";
import NewOrder from "./components/newOrder";
import ScrollToTop from "./components/utils/ScrollToTop";

const App = () => {
  return (
    <BrowserRouter>
      <UiContextProvider>
        <OrderContextProvider>
          <Routes>
            <Route path="/" element={<OrderSharedLayout />}>
              <Route index element={<Order />} />
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
              <Route path="recycleBin" element={<RecycleBin />} />
              <Route path="history" element={<History />} />
              <Route path="newOrder" element={<NewOrder />} />
            </Route>
          </Routes>
        </OrderContextProvider>
      </UiContextProvider>
    </BrowserRouter>
  );
};

export default App;
