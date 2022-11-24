import { createContext, useContext, useReducer } from "react";
import { orderData } from "../data";
import { reducer } from "./OrderReducer";

const orderState = {
  foodCountOthers: false,
  messageHide: true,
  addressHide: false,
  paymentState: "received",
  detailHide: false,
};

const initialState = orderData.map((order) => {
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

  const sendToRecycleBin = (id) => {
    dispatch({
      type: "SEND_TO_RECYCLE_BIN",
      payload: {
        id,
      },
    });
  };

  const sendToOrderReceived = (id) => {
    dispatch({
      type: "SEND_TO_ORDER_RECEIVED",
      payload: {
        id,
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
        sendToRecycleBin,
        sendToOrderReceived,
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
