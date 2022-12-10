import { createContext, useContext, useReducer } from "react";
import { reducer } from "./UiReducer";

const initialState = {
  isLoggedIn: false,
  navbar: false,
  orderNav: false,
  restaurantName: "",
  online: false,
};

const UiContext = createContext();

const UiContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const toggleNavbar = () => {
    dispatch({ type: "TOGGLE_NAVBAR" });
  };

  const toggleOrderNav = () => {
    dispatch({ type: "TOGGLE_ORDER_NAV" });
  };

  const onlineIndicate = (value) => {
    dispatch({
      type: "ONLINE_INDICATE",
      payload: {
        value: value,
      },
    });
  };

  return (
    <UiContext.Provider
      value={{
        ...state,
        toggleNavbar,
        toggleOrderNav,
        onlineIndicate,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};

const useUiContext = () => {
  return useContext(UiContext);
};

export { UiContext, UiContextProvider, useUiContext };
