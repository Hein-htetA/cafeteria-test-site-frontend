import { createContext, useContext, useReducer } from "react";
import { reducer } from "./MenuReducer";
import { menuData } from "../data";
import Resizer from "react-image-file-resizer";
const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      800,
      800,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

const MenuContext = createContext();

const MenuContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, menuData);
  // console.log("menu state", state);
  const editInput = (id, category, name, item, ref) => {
    dispatch({
      type: "EDIT_INPUT",
      payload: {
        id,
        category,
        ref,
        name,
        item, //nth bottom in single menu
      },
    });
  };

  const stopAnimation = (id, item) => {
    dispatch({
      type: "STOP_ANIMATION",
      payload: {
        id,
        item,
      },
    });
  };

  const onChangeInput = (id, category, value) => {
    // console.log("onchange input run");
    dispatch({
      type: "ONCHANGE_INPUT",
      payload: {
        id,
        category,
        value,
      },
    });
  };

  const onChangeImage = async (id, value) => {
    if (value.size > 6000000) {
      dispatch({ type: "IMAGE_ERROR_TRUE", payload: { id } });
      return;
    }

    try {
      const image = await resizeFile(value);
      dispatch({
        type: "ONCHANGE_IMAGE",
        payload: { id, image },
      });
      dispatch({
        type: "IMAGE_ERROR_FALSE",
        payload: { id },
      });
    } catch (err) {
      dispatch({ type: "IMAGE_ERROR_TRUE", payload: { id } });
    }
  };

  return (
    <MenuContext.Provider
      value={{
        menuData: [...state],
        editInput,
        stopAnimation,
        onChangeInput,
        onChangeImage,
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
