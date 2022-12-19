import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { usePublicDataContext } from "../../Context/PublicDataContext";
import { localBaseUrl } from "../utils/baseUrl";
import "./MarketplaceSharedLayout.css";
const MarketplaceSharedLayout = () => {
  return (
    <div className="marketplace-container">
      <Outlet />
    </div>
  );
};

export default MarketplaceSharedLayout;
