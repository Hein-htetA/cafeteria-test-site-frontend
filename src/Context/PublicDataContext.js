import { useContext, useReducer } from "react";
import { createContext } from "react";
import { reducer } from "./PublicDataReducer";

const PublicDataContext = createContext();

const PublicDataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    restaurant: [],
    page: 1,
    fetchRestaurantLoading: false,
    fetchRestaurantError: false,
  });
  return (
    <PublicDataContext.Provider value={{}}>
      {children}
    </PublicDataContext.Provider>
  );
};

const usePublicDataContext = () => {
  return useContext(PublicDataContext);
};

export { PublicDataContextProvider, usePublicDataContext };
