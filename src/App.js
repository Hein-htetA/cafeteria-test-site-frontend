import React from "react";
import Order from "./components/order";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainSharedLayout from "./components/sharedLayout/MainSharedLayout";
import Menu from "./components/menu";
import MenuSharedLayout from "./components/sharedLayout/MenuSharedLayout";
import SingleMenuDetail from "./components/menu/SingleMenuDetail";
import RecycleBin from "./components/recyclebin";
import History from "./components/history";
import NewOrder from "./components/newOrder";
import MarketplaceSharedLayout from "./components/sharedLayout/MarketplaceSharedLayout";
import Marketplace from "./components/marketplace";
import RestaurantMenu from "./components/menu/MenuCategory/RestaurantMenu";
import Profile from "./components/profile";
import Register from "./components/registerLogin/Register";
import RegisterRestaurant from "./components/registerRestaurant/RegisterRestaurant";
import OwnRestaurantInfo from "./components/myRestaurantInfo/OwnRestaurantInfo";
import MyAccountSharedLayout from "./components/sharedLayout/MyAccountSharedLayout";
import Login from "./components/registerLogin/Login";
import RestaurantSharedLayout from "./components/sharedLayout/RestaurantSharedLayout";
import PublicRestaurantsSharedLayout from "./components/sharedLayout/PublicRestaurantsSharedLayout";
import PublicRestaurantInfo from "./components/restaurantInfo/PublicRestaurantInfo";
import PublicRestaurantMenu from "./components/menu/MenuCategory/PublicRestaurantMenu";
import PublicMenu from "./components/menu/PublicMenuIndex";
import PublicSingleMenuDetail from "./components/menu/PublicSingleMenuDetail";
import CartSharedLayout from "./components/sharedLayout/CartSharedLayout";
import CartMenu from "./components/cart/CartMenu";
import CartCheckout from "./components/cart/CartCheckout";
import CartOrder from "./components/cart/CartOrder";
import PublicProfile from "./components/publicProfiles/PublicProfile";
import SearchResult from "./components/marketplace/SearchResult";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainSharedLayout />}>
          <Route index element={<Navigate to="/marketplace" />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="marketplace" element={<MarketplaceSharedLayout />}>
            <Route index element={<Marketplace />} />
            <Route path="search" element={<SearchResult />} />
            <Route
              path="restaurant/:restaurantId"
              element={<PublicRestaurantsSharedLayout />}
            >
              <Route path="info" element={<PublicRestaurantInfo />} />
              <Route path="profile" element={<PublicProfile />} />
              <Route path="menu" element={<MenuSharedLayout />}>
                <Route index element={<PublicRestaurantMenu />} />
                <Route path=":menuCategory" element={<PublicMenu />} />
                <Route
                  path=":menuCategory/:menuId"
                  element={<PublicSingleMenuDetail />}
                />
              </Route>
            </Route>
          </Route>
          <Route path="myAccount" element={<MyAccountSharedLayout />}>
            <Route path="profile" element={<Profile />} />
            <Route path="order" element={<Order />} />
            <Route path="recycleBin" element={<RecycleBin />} />
            <Route path="history" element={<History />} />
            <Route path="newOrder" element={<NewOrder />} />
            <Route path="cart" element={<CartSharedLayout />}>
              <Route path="cartMenu" element={<CartMenu />} />
              <Route path="cartCheckout" element={<CartCheckout />} />
              <Route path="cartOrder" element={<CartOrder />} />
            </Route>
            <Route path="myRestaurant" element={<RestaurantSharedLayout />}>
              <Route path="register" element={<RegisterRestaurant />} />
              <Route path="info" element={<OwnRestaurantInfo />} />
              <Route path="menu" element={<MenuSharedLayout />}>
                <Route index element={<RestaurantMenu />} />
                <Route path=":menuCategory" element={<Menu />} />
                <Route
                  path=":menuCategory/:menuId"
                  element={<SingleMenuDetail />}
                />
              </Route>
            </Route>
          </Route>
        </Route>
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
