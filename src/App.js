import React from "react";
import Navbar from "./components/navbar";
import Order from "./components/order";
import "./App.css";
import { OrderContextProvider } from "./Context/OrderContext";
import { UserContextProvider } from "./Context/UserContext";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import MainSharedLayout from "./components/sharedLayout/MainSharedLayout";
import Menu from "./components/menu";
import MenuSharedLayout from "./components/sharedLayout/MenuSharedLayout";
import { MenuContextProvider } from "./Context/MenuContext";
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
import { PublicDataContextProvider } from "./Context/PublicDataContext";
import RestaurantSharedLayout from "./components/sharedLayout/RestaurantSharedLayout";
import PublicRestaurantsSharedLayout from "./components/sharedLayout/PublicRestaurantsSharedLayout";
import PublicRestaurantInfo from "./components/restaurantInfo/PublicRestaurantInfo";
import PublicRestaurantMenu from "./components/menu/MenuCategory/PublicRestaurantMenu";
import PublicMenu from "./components/menu/PublicMenuIndex";
import PublicSingleMenuDetail from "./components/menu/PublicSingleMenuDetail";
import Cart from "./components/cart";
import CartSharedLayout from "./components/sharedLayout/CartSharedLayout";
import CartMenu from "./components/cart/CartMenu";
import CartCheckout from "./components/cart/CartCheckout";
import CartOrder from "./components/cart/CartOrder";
import { CartContextProvider } from "./Context/CartContext";

const App = () => {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <OrderContextProvider>
          <MenuContextProvider>
            <PublicDataContextProvider>
              <CartContextProvider>
                <Routes>
                  <Route path="/" element={<MainSharedLayout />}>
                    <Route
                      index
                      element={
                        localStorage.getItem("user") ? (
                          <Navigate to="/marketplace" />
                        ) : (
                          <Login />
                        )
                      }
                    />
                    {/* <Route path="login" element={<Login />} /> */}
                    <Route path="register" element={<Register />} />
                    <Route
                      path="marketplace"
                      element={<MarketplaceSharedLayout />}
                    >
                      <Route index element={<Marketplace />} />
                      <Route
                        path="restaurant/:restaurantId"
                        element={<PublicRestaurantsSharedLayout />}
                      >
                        <Route path="info" element={<PublicRestaurantInfo />} />
                        <Route path="menu" element={<MenuSharedLayout />}>
                          <Route index element={<PublicRestaurantMenu />} />
                          <Route
                            path=":menuCategory"
                            element={<PublicMenu />}
                          />
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
                      <Route
                        path="myRestaurant"
                        element={<RestaurantSharedLayout />}
                      >
                        <Route
                          path="register"
                          element={<RegisterRestaurant />}
                        />
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
              </CartContextProvider>
            </PublicDataContextProvider>
          </MenuContextProvider>
        </OrderContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  );
};

export default App;
