import { createContext, useContext, useReducer } from "react";
import { reducer } from "./UiReducer";

const initialState = {
  navbar: false,
};

const UiContext = createContext();

const UiContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const toggleNavbar = () => {
    dispatch({ type: "TOGGLE_NAVBAR" });
  };
  return (
    <UiContext.Provider value={{ ...state, toggleNavbar }}>
      {children}
    </UiContext.Provider>
  );
};

const useUiContext = () => {
  return useContext(UiContext);
};

export { UiContext, UiContextProvider, useUiContext };
