export const reducer = (state, action) => {
  const copyState = JSON.parse(JSON.stringify(state)); //treating react state as Read-Only
  const orderUiState = {
    messageHide: true,
    detailHide: false,
    detailContainerHeight: 0,
  };
  switch (action.type) {
    case "ON_CHANGE_INPUT_SELECT":
      const tempState1 = state.map((order) => {
        if (order._id === action.payload.id) {
          order[action.payload.item] = action.payload.value;
        }
        return order;
      });
      return tempState1;
    case "ON_CLICK_HIDE_SHOW":
      const tempState2 = copyState.map((order) => {
        if (order._id === action.payload.id) {
          order[action.payload.item] = !order[action.payload.item];
        }
        return order;
      });

      return tempState2;

    case "SEND_TO_ORDER":
      const tempState3 = copyState.map((order) => {
        if (order._id === action.payload.id) {
          order.orderState = "order";
          order.status = "accepted";
        }
        return order;
      });

      return tempState3;

    case "SEND_TO_RECYCLE_BIN":
      const tempState4 = copyState.map((order) => {
        if (order._id === action.payload.id) {
          order.status = "received";
          order.orderState = "recycleBin";
        }
        return order;
      });

      return tempState4;

    case "SEND_TO_HISTORY":
      const tempState6 = copyState.map((order) => {
        if (order._id === action.payload.id) {
          console.log("send to history if run");
          order.status = "onDelivery";
          order.paymentState = true;
          order.orderState = "history";
        }
        return order;
      });

      return tempState6;

    case "SET_DETAIL_CONTAINER_HEIGHT":
      //console.log("detail conainer reducer run");
      const tempState5 = copyState.map((order) => {
        if (order._id === action.payload.id) {
          order.detailContainerHeight = action.payload.value;
        }
        return order;
      });

      return tempState5;
    case "ON_CLICK_DETAIL_HIDE":
      const tempState7 = copyState.map((order) => {
        if (order._id === action.payload.id) {
          order.detailHide = true;
        }
        return order;
      });

      return tempState7;

    case "SET_ORDER_STATE":
      const tempState8 = action.payload.data.map((order) => {
        return { ...order, ...orderUiState };
      });
      return tempState8;

    case "ADD_NEW_ORDER":
      copyState.push(action.payload.data);
      return copyState;

    default:
      throw new Error("action type not supported yet");
  }
};
