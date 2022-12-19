import { useContext, useEffect, useReducer } from "react";
import { createContext } from "react";
import { localBaseUrl } from "../components/utils/baseUrl";
import { reducer } from "./PublicDataReducer";

const PublicDataContext = createContext();
const fetchUiStates = {
  restaurantLoading: false,
  restaurantError: false,
  moreRestaurantLoading: false,
  moreRestaurantError: false,
  firstLoadSuccess: true,
  noMoreRestaurant: false,
};

const initializeFun = (restaurantsString) => {
  let restaurants = [];
  let page = 1;

  if (restaurantsString) {
    restaurants = JSON.parse(restaurantsString);
    page = Math.ceil(restaurants.length / 3) + 1;
  }
  return { restaurants, page, ...fetchUiStates };
};

const PublicDataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    reducer,
    sessionStorage.getItem("restaurants"),
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
    dispatch({ type: "ADD_RESTAURANT_STATE", payload: data });
  };

  const increasePage = () => {
    dispatch({ type: "INCREASE_PAGE" });
  };

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
