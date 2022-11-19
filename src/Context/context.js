import { createContext, useContext, useReducer } from "react";
import { data } from "../data";
import { reducer } from "./reducer";

const appState = {
  foodCountOthers: false,
  messageHide: true,
  statusState: "accepted",
  addressHide: true,
  paymentState: "received",
  detailHide: false,
};

const initialState = data.map((order) => {
  return { ...order, ...appState };
});

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onChangeInputSelect = (id, item, event) => {
    dispatch({
      type: "ON_CHANGE_INPUT_SELECT",
      payload: {
        id,
        item,
        value: event.target.value,
      },
    });
  };

  const onClickHideShow = (id, item) => {
    dispatch({
      type: "ON_CLICK_HIDE_SHOW",
      payload: {
        id,
        item,
      },
    });
  };

  return (
    <AppContext.Provider
      value={{ data: [...state], onChangeInputSelect, onClickHideShow }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppContextProvider, useAppContext };
