import { useContext, useEffect, useReducer } from "react";
import { createContext } from "react";
import { reducer } from "./PublicDataReducer";

const PublicDataContext = createContext();
const fetchUiStates = {
  restaurantLoading: false, //marketplace restaurant data loading
  restaurantError: false,
  moreRestaurantLoading: false,
  moreRestaurantError: false,
  firstLoadSuccess: false, //hiding load more trigger in first fetch
  noMoreRestaurant: false,
  menuLoading: false,
  menuLoadingError: false,
};

const initializeFun = (arg) => {
  let restaurants = [];
  let page = 1;
  let menu = [];

  if (arg.restaurantsString) {
    restaurants = JSON.parse(arg.restaurantsString);
    page = Math.ceil(restaurants.length / 3) + 1;
  }

  if (arg.menuString) {
    menu = JSON.parse(arg.menuString);
  }

  return { restaurants, page, menu, ...fetchUiStates };
};

const PublicDataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    reducer,
    {
      restaurantsString: sessionStorage.getItem("restaurants"),
      menuString: sessionStorage.getItem("menu"),
    },
    initializeFun
  );

  const setRestaurantLoading = () => {
    dispatch({ type: "RESTAURANT_LOADING" });
  };
  const setRestaurantError = () => {
    dispatch({ type: "RESTAURANT_ERROR" });
  };
  const setMoreRestaurantLoading = () => {
    dispatch({ type: "MORE_RESTAURANT_LOADING" });
  };
  const setMoreRestaurantError = () => {
    dispatch({ type: "MORE_RESTAURANT_ERROR" });
  };

  const addRestaurantState = (data) => {
    if (data.length === 0) {
      dispatch({ type: "NO_MORE_RESTAURANTS" });
    }
    dispatch({ type: "ADD_RESTAURANT_STATE", payload: data });
  };

  const increasePage = () => {
    dispatch({ type: "INCREASE_PAGE" });
  };

  const setMenuLoading = () => {
    dispatch({ type: "MENU_LOADING" });
  };

  const setMenuError = () => {
    dispatch({ type: "MENU_ERROR" });
  };

  const addMenuState = (data) => {
    dispatch({ type: "ADD_MENU_STATE", payload: data });
  };

  useEffect(() => {
    sessionStorage.setItem("restaurants", JSON.stringify(state.restaurants));
  }, [state.restaurants]);

  useEffect(() => {
    sessionStorage.setItem("menu", JSON.stringify(state.menu));
  }, [state.menu]);

  return (
    <PublicDataContext.Provider
      value={{
        ...state,
        setRestaurantLoading,
        setRestaurantError,
        setMoreRestaurantLoading,
        setMoreRestaurantError,
        addRestaurantState,
        increasePage,
        setMenuError,
        setMenuLoading,
        addMenuState,
      }}
    >
      {children}
    </PublicDataContext.Provider>
  );
};

const usePublicDataContext = () => {
  return useContext(PublicDataContext);
};

export { PublicDataContextProvider, usePublicDataContext };
