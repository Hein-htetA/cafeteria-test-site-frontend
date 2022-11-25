import { createContext, useContext, useReducer } from "react";
import { orderData } from "../data";
import { reducer } from "./OrderReducer";

const orderState = {
  foodCountOthers: false,
  messageHide: true,
  detailHide: false,
  detailContainerHeight: 0,
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

  const onClickDetailHide = (id) => {
    dispatch({
      type: "ON_CLICK_DETAIL_HIDE",
      payload: {
        id,
      },
    });
  };

  const setDetailContainerHeight = (id, value) => {
    dispatch({
      type: "SET_DETAIL_CONTAINER_HEIGHT",
      payload: {
        id,
        value,
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
      type: "SEND_TO_ORDER",
      payload: {
        id,
      },
    });
  };

  const sendToHistory = (id) => {
    dispatch({
      type: "SEND_TO_HISTORY",
      payload: {
        id,
      },
    });
  };

  return (
    <OrderContext.Provider
      value={{
        data: [...state],
        onChangeInputSelect,
        onClickHideShow,
        sendToRecycleBin,
        sendToOrderReceived,
        setDetailContainerHeight,
        sendToHistory,
        onClickDetailHide,
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
