import { createContext, useContext, useReducer } from "react";
import { reducer } from "./UiReducer";

const initialState = {
  navbar: false,
  orderNav: false,
  orderLoading: false,
  orderError: false,
  restaurantName: "MinMaHar",
  online: false,
  updateLoading: false,
  updateError: false,
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

  const setOrderLoading = () => {
    dispatch({ type: "SET_ORDER_LOADING" });
  };

  const setOrderError = () => {
    dispatch({ type: "SET_ORDER_ERROR" });
  };

  const orderFetchSuccessful = () => {
    dispatch({ type: "ORDER_FETCH_SUCCESSFUL" });
  };

  const onlineIndicate = (value) => {
    dispatch({
      type: "ONLINE_INDICATE",
      payload: {
        value: value,
      },
    });
  };

  const setUpdateLoading = () => {
    dispatch({
      type: "SET_UPDATE_LOADING",
    });
  };

  const setUpdateError = () => {
    dispatch({
      type: "SET_UPDATE_ERROR",
    });
  };

  const updateFetchSuccessful = () => {
    dispatch({
      type: "UPDATE_FETCH_SUCCESSFUL",
    });
  };

  return (
    <UiContext.Provider
      value={{
        ...state,
        toggleNavbar,
        toggleOrderNav,
        setOrderLoading,
        setOrderError,
        setUpdateLoading,
        setUpdateError,
        orderFetchSuccessful,
        onlineIndicate,
        updateFetchSuccessful,
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
