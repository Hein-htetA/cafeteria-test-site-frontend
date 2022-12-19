import { createContext, useContext, useReducer } from "react";
import { reducer } from "./MenuReducer";
import { menuData } from "../data";
import Resizer from "react-image-file-resizer";
import { localBaseUrl } from "../components/utils/baseUrl";
import { useUiContext } from "./UiContext";

const MenuContext = createContext();

const MenuContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    data: [],
    menuLoading: false,
    menuError: false,
    restaurant: {},
    restaurantLoading: false,
    restaurantError: false,
  });

  const setMenuState = (controller) => {
    const fetchMenu = async () => {
      try {
        dispatch({ type: "MENU_LOADING" });
        const response = await fetch(
          `${localBaseUrl}/menu/${state.restaurant._id}`,
          {
            signal: controller.signal,
          }
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
    fetchMenu();
  };

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
        const response = await fetch(
          `${localBaseUrl}/restaurants/${restaurantId}`,
          {
            signal: controller.signal,
          }
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
        const response = await fetch(`${localBaseUrl}/menu/${restaurantId}`, {
          signal: controller.signal,
        });
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

  return (
    <MenuContext.Provider
      value={{
        ...state,
        setMenuState,
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
