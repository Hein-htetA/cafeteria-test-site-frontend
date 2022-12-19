import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useMenuContext } from "../../Context/MenuContext";
import { TestContextProvider } from "../../Context/TestContext";
import { useUiContext } from "../../Context/UiContext";
import TestComponent from "../../TestComponent";
import MenuInfoNav from "../menu/MenuInfoNav/MenuInfoNav";
import "./MenuSharedLayout.css";

const MenuSharedLayout = () => {
  return <Outlet />;
};

export default MenuSharedLayout;
