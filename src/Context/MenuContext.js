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
  });
  const { restaurantName } = useUiContext();

  const setMenuState = (controller) => {
    const fetchMenu = async () => {
      try {
        dispatch({ type: "MENU_LOADING" });
        const response = await fetch(
          `${localBaseUrl}/menu/${restaurantName
            .trim()
            .replaceAll(" ", "%20")}`,
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

  const updateMenuState = ({ _id, name, price, description, imageUrl }) => {
    dispatch({
      type: "UPDATE_MENU_STATE",
      payload: {
        _id,
        name,
        price,
        description,
        imageUrl,
      },
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
    console.log("data in contxt", data);
    dispatch({
      type: "ADD_NEW_MENU",
      payload: { data },
    });
  };

  return (
    <MenuContext.Provider
      value={{
        ...state,
        setMenuState,
        updateMenuState,
        deleteMenuState,
        addNewMenu,
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
