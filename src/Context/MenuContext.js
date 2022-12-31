import { createContext, useContext, useEffect, useReducer } from "react";
import { reducer } from "./MenuReducer";
import { localBaseUrl } from "../components/utils/baseUrl";

const MenuContext = createContext();

const initialState = {
  menuLoading: false,
  menuError: false,
  restaurantLoading: false,
  restaurantError: false,
};

const initializeFun = (arg) => {
  let restaurant = [];
  let data = [];

  if (arg.myRestaurant) {
    restaurant = JSON.parse(arg.myRestaurant);
  }

  if (arg.myMenu) {
    data = JSON.parse(arg.myMenu);
  }

  return { restaurant, data, ...initialState };
};

const MenuContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    reducer,
    {
      myRestaurant: sessionStorage.getItem("myRestaurant"),
      myMenu: sessionStorage.getItem("myMenu"),
    },
    initializeFun
  );

  const updateMenuState = (menu) => {
    dispatch({
      type: "UPDATE_MENU_STATE",
      payload: menu,
    });
  };

  const deleteMenuState = (_id) => {
    dispatch({
      type: "DELETE_MENU_STATE",
      payload: {
        _id,
      },
    });
  };

  const addNewMenu = (data) => {
    // console.log("data in contxt", data);
    dispatch({
      type: "ADD_NEW_MENU",
      payload: { data },
    });
  };

  const setRestaurantState = (controller, restaurantId) => {
    //both restaurant and menu fetch
    const fetchRestaurant = async () => {
      try {
        dispatch({ type: "RESTAURANT_LOADING" });
        const requestOptions = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          signal: controller.signal,
        };
        const response = await fetch(
          `${localBaseUrl}/restaurants/${restaurantId}`,
          requestOptions
        );
        if (!response.ok) {
          const message = `An error has occured: ${response.status}`;
          throw new Error(message);
        }
        const { restaurant } = await response.json();
        dispatch({ type: "UPDATE_LOCAL_RESTAURANT", payload: restaurant });
      } catch (e) {
        dispatch({ type: "RESTAURANT_ERROR" });
      }
    };
    const fetchMenu = async () => {
      try {
        dispatch({ type: "MENU_LOADING" });
        const requestOptions = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          signal: controller.signal,
        };
        const response = await fetch(
          `${localBaseUrl}/menu/${restaurantId}`,
          requestOptions
        );
        if (!response.ok) {
          const message = `An error has occured: ${response.status}`;
          throw new Error(message);
        }
        const responseData = await response.json();
        dispatch({
          type: "SET_MENU_STATE",
          payload: {
            data: responseData.data,
          },
        });
        // console.log("data", responseData.data);
      } catch (e) {
        console.log(e);
        dispatch({ type: "MENU_ERROR" });
      }
    };
    fetchRestaurant();
    fetchMenu();
  };

  const updateLocalRestaurant = (restaurant) => {
    dispatch({ type: "UPDATE_LOCAL_RESTAURANT", payload: restaurant });
  };

  useEffect(() => {
    sessionStorage.setItem("myRestaurant", JSON.stringify(state.restaurant));
  }, [state.restaurant]);
  useEffect(() => {
    sessionStorage.setItem("myMenu", JSON.stringify(state.data));
  }, [state.data]);

  return (
    <MenuContext.Provider
      value={{
        ...state,
        updateMenuState,
        deleteMenuState,
        addNewMenu,
        setRestaurantState,
        updateLocalRestaurant,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

const useMenuContext = () => {
  return useContext(MenuContext);
};

export { MenuContext, MenuContextProvider, useMenuContext };
