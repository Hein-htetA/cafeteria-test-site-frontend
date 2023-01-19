import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { fetchRestaurantsByPage } from "../../features/publicDataSlice";
import "./MarketplaceSharedLayout.css";
const MarketplaceSharedLayout = () => {
  const page = useSelector((state) => state.publicData.page);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRestaurantsByPage(page));
  }, [page]);
  return (
    <div className="marketplace-container">
      <Outlet />
    </div>
  );
};

export default MarketplaceSharedLayout;
