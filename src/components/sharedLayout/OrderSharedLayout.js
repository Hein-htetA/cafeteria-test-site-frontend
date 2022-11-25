import React from "react";
import Navbar from "../navbar";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../utils/ScrollToTop";

const SharedLayout = () => {
  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <Outlet />
    </div>
  );
};

export default SharedLayout;
