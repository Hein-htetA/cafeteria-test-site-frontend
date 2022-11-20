import { createContext, useContext, useReducer } from "react";
import { data } from "../data";
import { reducer } from "./OrderReducer";

const orderState = {
  foodCountOthers: false,
  messageHide: true,
  statusState: "accepted",
  addressHide: false,
  paymentState: "received",
  detailHide: false,
};

const initialState = data.map((order) => {
  return { ...order, ...orderState };
});

const OrderContext = createContext();

const OrderContextProvider = ({ children }) => {
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
    <OrderContext.Provider
      value={{
        data: [...state],
        onChangeInputSelect,
        onClickHideShow,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

const useOrderContext = () => {
  return useContext(OrderContext);
};

export { OrderContext, OrderContextProvider, useOrderContext };
