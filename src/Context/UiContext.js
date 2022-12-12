import { createContext, useContext, useReducer } from "react";
import { reducer } from "./UiReducer";

const initialState = {
  isLoggedIn: false,
  navbar: false,
  orderNav: false,
  restaurantName: "",
  online: false,
  user: {},
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

  const setLoggedIn = () => {
    dispatch({ type: "SET_LOGGED_IN" });
  };

  const setUser = (data) => {
    dispatch({ type: "SET_USER", payload: data });
  };

  return (
    <UiContext.Provider
      value={{
        ...state,
        toggleNavbar,
        toggleOrderNav,
        onlineIndicate,
        setLoggedIn,
        setUser,
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
