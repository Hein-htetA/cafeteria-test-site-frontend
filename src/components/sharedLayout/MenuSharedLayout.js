import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import ScrollToTop from "../utils/ScrollToTop";

import "./MenuSharedLayout.css";

const MenuSharedLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
};

export default MenuSharedLayout;
