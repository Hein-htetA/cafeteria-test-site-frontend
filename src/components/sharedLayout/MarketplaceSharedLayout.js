import React from "react";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../utils/ScrollToTop";
import "./MarketplaceSharedLayout.css";
const MarketplaceSharedLayout = () => {
  return (
    <div className="marketplace-container">
      <Outlet />
    </div>
  );
};

export default MarketplaceSharedLayout;
