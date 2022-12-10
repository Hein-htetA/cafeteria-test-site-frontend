import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar";
import ScrollToTop from "../utils/ScrollToTop";
import "./MarketplaceSharedLayout.css";
const MarketplaceSharedLayout = () => {
  return (
    <div className="marketplace-container">
      <ScrollToTop />
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MarketplaceSharedLayout;
