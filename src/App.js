import React from "react";
import Navbar from "./components/navbar";
import Order from "./components/order";
import "./App.css";
import { OrderContextProvider } from "./Context/OrderContext";
import { UiContextProvider } from "./Context/UiContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainSharedLayout from "./components/sharedLayout/MainSharedLayout";
import Menu from "./components/menu";
import MenuSharedLayout from "./components/sharedLayout/MenuSharedLayout";
import { MenuContextProvider } from "./Context/MenuContext";
import SingleMenuDetail from "./components/menu/SingleMenuDetail";
import RecycleBin from "./components/recyclebin";
import History from "./components/history";
import NewOrder from "./components/newOrder";
import MenuCategory from "./components/menu/MenuCategory/MenuCategory";
import MarketplaceSharedLayout from "./components/sharedLayout/MarketplaceSharedLayout";
import Marketplace from "./components/marketplace";
import MenuInfoNav from "./components/marketplace/MenuInfoNav";
import RestaurantMenu from "./components/marketplace/RestaurantMenu";
import Info from "./components/marketplace/Info";
import Title from "./components/menu/MenuCategory/Title";

const App = () => {
  return (
    <BrowserRouter>
      <UiContextProvider>
        <OrderContextProvider>
          <MenuContextProvider>
            <Routes>
              <Route path="/" element={<MainSharedLayout />}>
                <Route index element={<Order />} />
                <Route path="menu" element={<MenuSharedLayout />}>
                  <Route
                    index
                    element={
                      <>
                        <Title />
                        <MenuCategory />
                      </>
                    }
                  />
                  <Route
                    path=":menuCategory"
                    element={<Menu isOwner={true} />}
                  />
                  <Route
                    path=":menuCategory/:menuId"
                    element={<SingleMenuDetail />}
                  />
                </Route>
                <Route path="recycleBin" element={<RecycleBin />} />
                <Route path="history" element={<History />} />
                <Route path="newOrder" element={<NewOrder />} />
                <Route path="marketplace" element={<MarketplaceSharedLayout />}>
                  <Route index element={<Marketplace />} />
                  <Route path=":restaurantName" element={<MenuInfoNav />}>
                    <Route index element={<RestaurantMenu />} />
                    <Route
                      path=":menuCategory"
                      element={<Menu isOwner={false} />}
                    />
                    <Route
                      path=":menuCategory/:menuId"
                      element={<SingleMenuDetail />}
                    />
                    <Route path="info" element={<Info />} />
                  </Route>
                </Route>
              </Route>
            </Routes>
          </MenuContextProvider>
        </OrderContextProvider>
      </UiContextProvider>
    </BrowserRouter>
  );
};

export default App;
