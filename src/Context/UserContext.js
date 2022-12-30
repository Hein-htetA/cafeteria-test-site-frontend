import { createContext, useContext, useEffect, useReducer } from "react";
import { reducer } from "./UserReducer";

const initialState = {
  isLoggedIn: false,
  online: false,
  user: {},
};

const initializeFun = (userString) => {
  let user = {};
  let isLoggedIn = false;

  if (userString) {
    user = JSON.parse(userString);
    isLoggedIn = true;
  }

  return { ...initialState, user, isLoggedIn };
};

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    reducer,
    localStorage.getItem("user"),
    initializeFun
  );

  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("user");
  //   if (loggedInUser) {
  //     const foundUser = JSON.parse(loggedInUser);
  //     dispatch({ type: "SET_USER", payload: foundUser });
  //     dispatch({ type: "SET_LOGGED_IN" });
  //   }
  // }, []);
  const openNavbar = () => {
    dispatch({ type: "OPEN_NAVBAR" });
  };
  const closeNavbar = () => {
    dispatch({ type: "CLOSE_NAVBAR" });
  };
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

  const setRestaurant = (data) => {
    dispatch({ type: "SET_RESTAURANT", payload: data });
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        toggleNavbar,
        toggleOrderNav,
        onlineIndicate,
        setLoggedIn,
        setUser,
        setRestaurant,
        openNavbar,
        closeNavbar,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserContext, UserContextProvider, useUserContext };
