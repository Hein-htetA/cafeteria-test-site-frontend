import React, { useEffect, useRef } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useOrderContext } from "../../Context/OrderContext";
import { useUserContext } from "../../Context/UserContext";
import { localBaseUrl } from "../utils/baseUrl";
import ScrollToTop from "../utils/ScrollToTop";

const MyAccountSharedLayout = () => {
  const { isLoggedIn } = useUserContext();
  return (
    <>
      <ScrollToTop />
      {isLoggedIn ? <Outlet /> : <Navigate to="/" replace />}
    </>
  );
};

export default MyAccountSharedLayout;
