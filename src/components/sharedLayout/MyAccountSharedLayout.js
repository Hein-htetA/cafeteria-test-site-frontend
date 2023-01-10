import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import ScrollToTop from "../utils/ScrollToTop";

const MyAccountSharedLayout = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
};

export default MyAccountSharedLayout;
