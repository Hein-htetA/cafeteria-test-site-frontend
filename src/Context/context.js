import { createContext, useContext, useReducer } from "react";
import { data } from "../data";
import { reducer } from "./reducer";

const appState = {
  foodCountOthers: false,
  messageHide: true,
  statusState: "accepted",
  addressHide: false,
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

  // const detailHideFun = (id) => {
  //   dispatch({
  //     type: "DETAIL_HIDE",
  //     payload: {
  //       id,
  //     },
  //   });
  // };

  return (
    <AppContext.Provider
      value={{
        data: [...state],
        onChangeInputSelect,
        onClickHideShow,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppContextProvider, useAppContext };
