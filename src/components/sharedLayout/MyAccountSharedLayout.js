import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../../Context/UserContext";
import ScrollToTop from "../utils/ScrollToTop";

const MyAccountSharedLayout = () => {
  const { isLoggedIn } = useUserContext();
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <ScrollToTop />
      {/* {isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />} */}
      <Outlet />
    </>
  );
};

export default MyAccountSharedLayout;
