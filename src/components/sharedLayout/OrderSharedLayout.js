import React from "react";
import Navbar from "../navbar";
import { Outlet } from "react-router-dom";

const SharedLayout = () => {
  console.log("shared layout re render");
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default SharedLayout;
