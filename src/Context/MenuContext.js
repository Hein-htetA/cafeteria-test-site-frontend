import { createContext, useContext, useReducer } from "react";
import { reducer } from "./MenuReducer";
import { menuData } from "../data";

const MenuContext = createContext();

const MenuContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, menuData);
  console.log(state);
  const toggleNavbar = () => {
    dispatch({ type: "TOGGLE_NAVBAR" });
  };
  return (
    <MenuContext.Provider value={[...state]}>{children}</MenuContext.Provider>
  );
};

const useMenuContext = () => {
  return useContext(MenuContext);
};

export { MenuContext, MenuContextProvider, useMenuContext };
