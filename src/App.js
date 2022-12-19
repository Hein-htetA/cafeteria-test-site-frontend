import React from "react";
import Navbar from "./components/navbar";
import Order from "./components/order";
import "./App.css";
import { OrderContextProvider } from "./Context/OrderContext";
import { UiContextProvider } from "./Context/UiContext";
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
import MenuCategory from "./components/menu/MenuCategory/MenuCategory";
import MarketplaceSharedLayout from "./components/sharedLayout/MarketplaceSharedLayout";
import Marketplace from "./components/marketplace";
import MenuInfoNav from "./components/menu/MenuInfoNav/MenuInfoNav";
import RestaurantMenu from "./components/menu/MenuCategory/RestaurantMenu";
import RestaurantInfo from "./components/restaurantInfo/RestaurantInfo";
import Profile from "./components/profile";
import ProfileDetail from "./components/profile/ProfileDetail";
import Register from "./components/registerLogin/Register";
import Error404 from "./components/Error404/Error404";
import RegisterRestaurant from "./components/registerRestaurant/RegisterRestaurant";
import OwnRestaurantInfo from "./components/myRestaurantInfo/OwnRestaurantInfo";
import MyAccountSharedLayout from "./components/sharedLayout/MyAccountSharedLayout";
import Login from "./components/registerLogin/Login";
import { TestContextProvider } from "./Context/TestContext";
import TestComponent from "./TestComponent";
import { PublicDataContextProvider } from "./Context/PublicDataContext";
import RestaurantSharedLayout from "./components/sharedLayout/RestaurantSharedLayout";

const App = () => {
  return (
    <BrowserRouter>
      <UiContextProvider>
        <OrderContextProvider>
          <MenuContextProvider>
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
                <Route path="register" element={<Register />} />
                <Route
                  path="marketplace"
                  element={
                    <PublicDataContextProvider>
                      <MarketplaceSharedLayout />
                    </PublicDataContextProvider>
                  }
                >
                  <Route index element={<Marketplace />} />
                  <Route path="restaurant" element={<RestaurantSharedLayout />}>
                    <Route path="info" element={<OwnRestaurantInfo />} />
                    <Route path="menu" element={<MenuSharedLayout />}>
                      <Route index element={<RestaurantMenu />} />
                      <Route
                        path=":menuCategory"
                        element={<Menu isOwner={false} />}
                      />
                      <Route
                        path=":menuCategory/:menuId"
                        element={<SingleMenuDetail />}
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
                  <Route
                    path="myRestaurant"
                    element={<RestaurantSharedLayout />}
                  >
                    <Route path="register" element={<RegisterRestaurant />} />
                    <Route path="info" element={<OwnRestaurantInfo />} />
                    <Route path="menu" element={<MenuSharedLayout />}>
                      <Route index element={<RestaurantMenu />} />
                      <Route
                        path=":menuCategory"
                        element={<Menu isOwner={true} />}
                      />
                      <Route
                        path=":menuCategory/:menuId"
                        element={<SingleMenuDetail />}
                      />
                    </Route>
                  </Route>
                </Route>
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </MenuContextProvider>
        </OrderContextProvider>
      </UiContextProvider>
    </BrowserRouter>
  );
};

export default App;
