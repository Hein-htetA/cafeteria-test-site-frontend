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

const App = () => {
  return (
    <BrowserRouter>
      <UiContextProvider>
        <OrderContextProvider>
          <MenuContextProvider>
            <Routes>
              <Route path="/" element={<MarketplaceSharedLayout />}>
                <Route index element={<Marketplace />} />
                <Route
                  exact
                  path=":restaurantName"
                  element={<MenuSharedLayout />}
                >
                  <Route index element={<RestaurantMenu />} />
                  <Route
                    path=":menuCategory"
                    element={<Menu isOwner={false} />}
                  />
                  <Route
                    path=":menuCategory/:menuId"
                    element={<SingleMenuDetail />}
                  />
                  <Route path="info" element={<RestaurantInfo />} />
                </Route>
                <Route path="register" element={<Register />} />
              </Route>
              <Route path="profile" element={<MainSharedLayout />}>
                <Route index element={<Profile />} />
              </Route>
              <Route path="myRestaurant" element={<MainSharedLayout />}>
                <Route path="order" element={<Order />} />
                <Route path="recycleBin" element={<RecycleBin />} />
                <Route path="history" element={<History />} />
                <Route path="newOrder" element={<NewOrder />} />

                <Route path=":restaurantName" element={<MenuSharedLayout />}>
                  <Route index element={<RestaurantMenu />} />
                  <Route
                    path=":menuCategory"
                    element={<Menu isOwner={true} />}
                  />
                  <Route
                    path=":menuCategory/:menuId"
                    element={<SingleMenuDetail />}
                  />
                  <Route path="info" element={<RestaurantInfo />} />
                </Route>
              </Route>
              <Route
                path="*"
                element={<Navigate to="/marketplace" replace />}
              />
            </Routes>
          </MenuContextProvider>
        </OrderContextProvider>
      </UiContextProvider>
    </BrowserRouter>
  );
};

export default App;
